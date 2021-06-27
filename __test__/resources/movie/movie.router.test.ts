import supertest from 'supertest';
import { writeJsonSync } from 'fs-extra';
import app from '../../../src/app';
import IDbSchema from '../../../src/database/IDbSchema';
import { IGetMoviesDto } from '../../../src/resources/movie/dtos/getMovies.dto';
import MovieDto from '../../../src/resources/movie/dtos/movie.dto';
import { DB_FILE } from '../../config';
import { genres, movies, newMovie } from '../../data';

const request = supertest(app);
const generalRoute = '/api/movie/';

const seedDbFile = (data: IDbSchema) => {
    writeJsonSync(DB_FILE, data, { spaces: 2 });
};

beforeEach(() => seedDbFile({ genres, movies }));

describe('Tests for the GET /api/movie endpoints', () => {
    describe('GET / endpoint.', () => {
        describe('Correct results/no errors expected.', () => {
            test(`Should return one movie.`, async () => {
                const res = await request.get(`${generalRoute}`);
                const moviesDto: IGetMoviesDto = res.body;
                const randomMovie = moviesDto.movies[0];

                const isContainedInDataFromDBFile = movies.some(
                    (m) => m.id === randomMovie.id
                );

                expect(res.status).toBe(200);
                expect(moviesDto.movies).toHaveLength(1);
                expect(isContainedInDataFromDBFile).toBe(true);
            });
        });

        describe(`Errors expected`, () => {
            test(`There are no movies in the db. Should return a json error with proper message.`, async () => {
                seedDbFile({ genres, movies: [] });
                const res = await request.get(`${generalRoute}`);
                const errorObj = {
                    error: 'There are no movies in the database',
                };

                expect(res.status).toBe(500);
                expect(res.body).toEqual(errorObj);
            });
        });
    });

    describe(`GET /:durationFrom/:durationTo endpoint.`, () => {
        describe('Correct results/no errors expected.', () => {
            test('Duration from and to are valid, positive numbers. From is smaller than To. Should return movies with runtime between.', async () => {
                const durationFrom = 100;
                const durationTo = 120;
                const idsOfMovies0WithDurationBetween = [2, 4, 5];

                const res = await request.get(
                    `${generalRoute}${durationFrom}/${durationTo}`
                );
                const movies = res.body.movies;

                expect(res.status).toBe(200);
                expect(movies).toHaveLength(3);
                movies.forEach((m) => {
                    const isInCorrectIds = idsOfMovies0WithDurationBetween.includes(
                        m.id
                    );
                    expect(isInCorrectIds).toBe(true);
                });
            });
        });

        describe(`Errors expected`, () => {
            test(`Duration from is bigger than to. Should return a json error with a proper message.`, async () => {
                const durationFrom = 10;
                const durationTo = 5;
                const errorObj = {
                    error: 'Duration FROM number can not be greater than duration TO number',
                };

                const res = await request.get(
                    `${generalRoute}${durationFrom}/${durationTo}`
                );

                expect(res.status).toBe(400);
                expect(res.body).toEqual(errorObj);
            });

            test(`Duration from and/or duration to are not a number. Should return a json error with a proper message`, async () => {
                const durationInvalid = 'sds';
                const durationValid = 19;
                const errorObj = {
                    error: 'Duration must be an integer number',
                };

                const resFromInvalid = await request.get(
                    `${generalRoute}${durationInvalid}/${durationValid}`
                );
                const resToInvalid = await request.get(
                    `${generalRoute}${durationValid}/${durationInvalid}`
                );

                const results = [resFromInvalid, resToInvalid];
                results.forEach((res) => {
                    expect(res.status).toBe(400);
                    expect(res.body).toEqual(errorObj);
                });
            });

            test(`Duration from and duration to are negative values. Should send back a json object with a proper error message.`, async () => {
                const durationNegative = -10;
                const durationPositive = 5;
                const errorObj = {
                    error: 'Duration must be a positive number',
                };

                const resFromNegative = await request.get(
                    `${generalRoute}${durationNegative}/${durationPositive}`
                );
                const resToNegative = await request.get(
                    `${generalRoute}${durationPositive}/${durationNegative}`
                );

                const results = [resFromNegative, resToNegative];
                results.forEach((res) => {
                    expect(res.status).toBe(400);
                    expect(res.body).toEqual(errorObj);
                });
            });

            test(`Duration values are bigger than max value. Should send back a json object with a proper error message.`, async () => {
                const durationBiggerThanMax = 6000;
                const errorObjMax = {
                    error: `Duration must be smaller than 1000`,
                };

                const resTooBig = await request.get(
                    `${generalRoute}${durationBiggerThanMax}/${durationBiggerThanMax}`
                );

                expect(resTooBig.status).toBe(400);
                expect(resTooBig.body).toEqual(errorObjMax);
            });

            test(`There are no movies in the db. Should return a json error with proper message.`, async () => {
                const durationFrom = 100;
                const durationTo = 120;
                const errorObj = {
                    error: 'There are no movies in the database',
                };

                seedDbFile({ genres, movies: [] });
                const res = await request.get(
                    `${generalRoute}${durationFrom}/${durationTo}`
                );

                expect(res.status).toBe(500);
                expect(res.body).toEqual(errorObj);
            });
        });
    });

    describe('GET /:genres endpoint.', () => {
        describe('Correct results/no errors expected.', () => {
            test(`Genres were provided with a valid format and their value can be found in GENRES enum.
            Should return right number of movies.`, async () => {
                const genresParam = 'Crime,Drama';
                const correctMoviesIds = [1, 2, 4, 5, 6];

                const res = await request.get(`${generalRoute}${genresParam}`);
                const movies: MovieDto[] = res.body.movies;

                expect(movies).toHaveLength(5);
                movies.forEach((m) =>
                    expect(correctMoviesIds.includes(m.id)).toBe(true)
                );
            });

            test(`Genres were provided with a valid format and their value can be found in GENRES enum.
            Should return movies sorted by the highest match amount.`, async () => {
                const genresParam = 'Crime,Drama';
                const correctMoviesIdsWith2Matches = [1, 5, 6];
                const correctMoviesIdsWith1Match = [2, 4];

                const res = await request.get(`${generalRoute}${genresParam}`);
                const movies: MovieDto[] = res.body.movies;

                const resMoviesThatShouldHave2Matches = movies.splice(0, 3);
                const resMoviesThatShouldHave1Match = movies;

                resMoviesThatShouldHave2Matches.forEach((m) =>
                    expect(correctMoviesIdsWith2Matches.includes(m.id))
                );
                resMoviesThatShouldHave1Match.forEach((m) =>
                    expect(correctMoviesIdsWith1Match.includes(m.id))
                );
            });

            test(`There are no movies with matching genres in the db. Should return an empty array and status 200. `, async () => {
                const genresParam = 'War';
                const emptyArray = [];

                const res = await request.get(`${generalRoute}${genresParam}`);
                const movies: MovieDto[] = res.body.movies;

                expect(movies).toHaveLength(0);
                expect(movies).toEqual(emptyArray);
            });
        });

        describe(`Errors expected`, () => {
            test(`Genres parameter provided will contain some genres that are not in GENRES enum. 
            Should return json object with a proper error message.`, async () => {
                const genresParam = 'Crime,Dramat';
                const errorObj = {
                    error: 'At least some of provided genres are invalid',
                };

                const res = await request.get(`${generalRoute}${genresParam}`);

                expect(res.status).toBe(400);
                expect(res.body).toEqual(errorObj);
            });

            test(`Genres parameter provided will contain some genres that are not in GENRES enum. 
            Should return json object with a proper error message.`, async () => {
                const genresParam = 'Crime,Dramat';
                const errorObj = {
                    error: 'At least some of provided genres are invalid',
                };

                const res = await request.get(`${generalRoute}${genresParam}`);

                expect(res.status).toBe(400);
                expect(res.body).toEqual(errorObj);
            });
        });
    });

    describe(`GET /:genres/:durationFrom/:durationTo endpoint.`, () => {
        describe('Correct results/no errors expected.', () => {
            test(`Genres and duration were provided with a valid format.
            Should return right number of movies.`, async () => {
                const genresParam = 'Crime,Drama';
                const durationFrom = 50;
                const durationTo = 135;
                const correctMoviesIds = [2, 4, 5, 6];

                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );
                const movies: MovieDto[] = res.body.movies;

                expect(movies).toHaveLength(4);
                movies.forEach((m) =>
                    expect(correctMoviesIds.includes(m.id)).toBe(true)
                );
            });

            test(`Genres and duration were provided with a valid format.
            Should return movies sorted by the highest genres match amount.`, async () => {
                const genresParam = 'Crime,Drama';
                const durationFrom = 50;
                const durationTo = 135;
                const correctMoviesIdsWith2Matches = [5, 6];
                const correctMoviesIdsWith1Match = [2, 4];

                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );
                const movies: MovieDto[] = res.body.movies;

                const resMoviesThatShouldHave2Matches = movies.splice(0, 2);
                const resMoviesThatShouldHave1Match = movies;

                resMoviesThatShouldHave2Matches.forEach((m) =>
                    expect(correctMoviesIdsWith2Matches.includes(m.id))
                );
                resMoviesThatShouldHave1Match.forEach((m) =>
                    expect(correctMoviesIdsWith1Match.includes(m.id))
                );
            });

            test(`There are no movies with matching genres in the db. Should return an empty array and status 200. `, async () => {
                const genresParam = 'War';
                const durationFrom = 50;
                const durationTo = 135;
                const emptyArray = [];

                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );
                const movies: MovieDto[] = res.body.movies;

                expect(movies).toHaveLength(0);
                expect(movies).toEqual(emptyArray);
            });
        });

        describe(`Errors expected`, () => {
            test(`Genres parameter provided will contain some genres that are not in GENRES enum. 
            Should return json object with a proper error message.`, async () => {
                const genresParam = 'Crime,Dramat';
                const durationFrom = 50;
                const durationTo = 135;
                const errorObj = {
                    error: 'At least some of provided genres are invalid',
                };

                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );

                expect(res.status).toBe(400);
                expect(res.body).toEqual(errorObj);
            });

            test(`Genres parameter provided will contain some genres that are not in GENRES enum. 
            Should return json object with a proper error message.`, async () => {
                const genresParam = 'Crime,Dramat';
                const durationFrom = 50;
                const durationTo = 135;
                const errorObj = {
                    error: 'At least some of provided genres are invalid',
                };

                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );

                expect(res.status).toBe(400);
                expect(res.body).toEqual(errorObj);
            });

            test(`Duration from is bigger than to. Should return a json error with a proper message.`, async () => {
                const genresParam = 'Crime,Drama';
                const durationFrom = 10;
                const durationTo = 5;
                const errorObj = {
                    error: 'Duration FROM number can not be greater than duration TO number',
                };

                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );

                expect(res.status).toBe(400);
                expect(res.body).toEqual(errorObj);
            });

            test(`Duration from and/or duration to are not a number. Should return a json error with a proper message`, async () => {
                const genresParam = 'Crime,Drama';
                const durationInvalid = 'sds';
                const durationValid = 19;
                const errorObj = {
                    error: 'Duration must be an integer number',
                };

                const resFromInvalid = await request.get(
                    `${generalRoute}${genresParam}/${durationInvalid}/${durationValid}`
                );
                const resToInvalid = await request.get(
                    `${generalRoute}${genresParam}/${durationValid}/${durationInvalid}`
                );

                const results = [resFromInvalid, resToInvalid];
                results.forEach((res) => {
                    expect(res.status).toBe(400);
                    expect(res.body).toEqual(errorObj);
                });
            });

            test(`Duration from and duration to are negative values. Should send back a json object with a proper error message.`, async () => {
                const genresParam = 'Crime,Drama';
                const durationNegative = -10;
                const durationPositive = 5;
                const errorObj = {
                    error: 'Duration must be a positive number',
                };

                const resFromNegative = await request.get(
                    `${generalRoute}${genresParam}/${durationNegative}/${durationPositive}`
                );
                const resToNegative = await request.get(
                    `${generalRoute}${genresParam}/${durationPositive}/${durationNegative}`
                );

                const results = [resFromNegative, resToNegative];
                results.forEach((res) => {
                    expect(res.status).toBe(400);
                    expect(res.body).toEqual(errorObj);
                });
            });

            test(`Duration values are bigger than max value. Should send back a json object with a proper error message.`, async () => {
                const genresParam = 'Crime,Drama';
                const durationBiggerThanMax = 6000;
                const errorObjMax = {
                    error: `Duration must be smaller than 1000`,
                };

                const resTooBig = await request.get(
                    `${generalRoute}${genresParam}/${durationBiggerThanMax}/${durationBiggerThanMax}`
                );

                expect(resTooBig.status).toBe(400);
                expect(resTooBig.body).toEqual(errorObjMax);
            });

            test(`There are no movies in the db. Should return a json error with proper message.`, async () => {
                const genresParam = 'Crime,Drama';
                const durationFrom = 100;
                const durationTo = 120;
                const errorObj = {
                    error: 'There are no movies in the database',
                };

                seedDbFile({ genres, movies: [] });
                const res = await request.get(
                    `${generalRoute}${genresParam}/${durationFrom}/${durationTo}`
                );

                expect(res.status).toBe(500);
                expect(res.body).toEqual(errorObj);
            });
        });
    });
});

describe(`Tests for the POST /api/movie endpoints.`, () => {
    describe(`Tests fot the POST / endpoint.`, () => {
        describe('Correct results/no errors expected.', () => {
            test(`Should add a new movie to the db with a correct ID.`, async () => {
                const nextExpectedId = 7;
                const res = await request.post(`${generalRoute}`).send(newMovie);
                const resultMovie = res.body;

                expect(resultMovie.id).toBe(nextExpectedId);
                expect(resultMovie).toEqual(expect.objectContaining(newMovie));
            });

            test(`Db is empty. Should add a new movie to the db with a correct ID.`, async () => {
                seedDbFile({ genres, movies: [] });
                const nextExpectedId = 1;
                const res = await request.post(generalRoute).send(newMovie);
                const resultMovie = res.body;

                expect(resultMovie.id).toBe(nextExpectedId);
                expect(resultMovie).toEqual(expect.objectContaining(newMovie));
            });
        });

        describe(`Errors expected`, () => {
            const emptyString = '';
            const spaces = '    ';
            const positiveNumber = 10;
            const negativeNumber = -5;
            const numberTooBig = 5000;
            const yearTooSmall = 1500;
            const longerThan255Characters =
                'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.';
            const genreNotEnum = 'Crimet';
            const isNotUrl = 'http:ksjasaldja.sdj';

            test('Title is not valid. Should return json object with an error message.', async () => {
                const invalidTitlesArray = [
                    emptyString,
                    spaces,
                    positiveNumber,
                    longerThan255Characters,
                    undefined,
                ];
                await _expectErrorForWrongPropValues(invalidTitlesArray, 'title');
            });

            test('Year is not valid. Should return json object with an error message.', async () => {
                const invalidYearsArray = [
                    emptyString,
                    positiveNumber,
                    negativeNumber,
                    undefined,
                    numberTooBig,
                    yearTooSmall,
                ];
                await _expectErrorForWrongPropValues(invalidYearsArray, 'year');
            });

            test('Runtime is not valid. Should return json object with an error message.', async () => {
                const invalidRuntimesArray = [
                    emptyString,
                    negativeNumber,
                    undefined,
                    numberTooBig,
                    0,
                ];
                await _expectErrorForWrongPropValues(invalidRuntimesArray, 'runtime');
            });

            test('Director is not valid. Should return json object with an error message.', async () => {
                const invalidDirectorsArray = [
                    emptyString,
                    spaces,
                    positiveNumber,
                    longerThan255Characters,
                    undefined,
                ];
                await _expectErrorForWrongPropValues(invalidDirectorsArray, 'director');
            });

            test('Genres are not valid. Should return json object with an error message.', async () => {
                const invalidGenresArray = [
                    emptyString,
                    spaces,
                    positiveNumber,
                    undefined,
                    genreNotEnum,
                ];
                await _expectErrorForWrongPropValues(invalidGenresArray, 'genres');
            });

            test('Actors are not valid. Should return json object with an error message.', async () => {
                const invalidGenresArray = [
                    emptyString,
                    spaces,
                    positiveNumber
                ];
                await _expectErrorForWrongPropValues(invalidGenresArray, 'actors');
            });

            test('Plot is not valid. Should return json object with an error message.', async () => {
                const invalidGenresArray = [
                    emptyString,
                    spaces,
                    positiveNumber
                ];
                await _expectErrorForWrongPropValues(invalidGenresArray, 'plot');
            });

            test('PosterUrl is not valid. Should return json object with an error message.', async () => {
                const invalidGenresArray = [
                    emptyString,
                    spaces,
                    positiveNumber,
                    isNotUrl
                ];
                await _expectErrorForWrongPropValues(invalidGenresArray, 'posterUrl');
            });
        });
    });
});


async function _expectErrorForWrongPropValues(invalidPropValuesArray: any[], propName: string) {
    for (const invalidValue of invalidPropValuesArray) {
        const invalidNewMovie = Object.assign({}, newMovie);
        invalidNewMovie[propName] = invalidValue;

        const res = await request
            .post(generalRoute)
            .send(invalidNewMovie);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    }
}
