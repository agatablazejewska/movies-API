import supertest from 'supertest';
import { writeJsonSync } from 'fs-extra';
import app from '../../../src/app';
import IDbSchema from '../../../src/database/IDbSchema';
import {
    IGetMoviesDto,
} from '../../../src/resources/movie/dtos/getMovies.dto';
import { DB_FILE } from '../../config.test';
import { genres, movies } from '../../data';

const request = supertest(app);

const seedDbFile = (data: IDbSchema) => {
    writeJsonSync(DB_FILE, data, { spaces: 2 });
};

describe('Tests for the GET /api/movie endpoints', () => {
    describe('GET / endpoint.', () => {
        describe('Correct results/no errors expected.', () => {
            beforeAll(() => seedDbFile({ genres, movies }));

            test(`Should return one movie.`, async () => {
                const res = await request.get('/api/movie/');
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
                seedDbFile({ genres: [], movies: [] })
                const res = await request.get('/api/movie/');
                const errorObj = {
                    error: 'There are no movies in the database'
                }

                expect(res.status).toBe(500);
                expect(res.body).toEqual(errorObj);
            })
        });
    });
});

describe('Correct results/no errors expected.', () => {});

describe(`Errors expected`, () => {});
