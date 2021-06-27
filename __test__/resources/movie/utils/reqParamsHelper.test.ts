import { Request } from 'jest-express/lib/request';
import BadRequestError from '../../../../src/resources/movie/utils/badRequestError';
import {
    convertGenresParamToArr, getDurationParams,
} from '../../../../src/resources/movie/utils/reqParamsHelper';

let request;

beforeEach(() => {
    request = new Request();
});

describe(`Tests for convertGenresParamToArr method.`, () => {
    const genres = 'Crime,Thriller,Drama';

    test('Should split genres into array.', () => {
        request.setParams('genres', genres);
        const correctArray = ['Crime', 'Thriller', 'Drama'];
        const result = convertGenresParamToArr(request);

        expect(result).toHaveLength(3);
        expect(result).toEqual(correctArray);
    });
});

describe(`Tests for getDurationParams method.`, () => {
    const word = 'someWord';
    const numberWithSpaces = '      123';
    const numberWithSpacesBothSides = '      123    ';
    const booleanStr = 'true';
    const correctDuration123 = '123';
    const correctDuration200 = '200';

    describe('Correct results/no errors expected.', () => {
        test('Correct params were passed. Should return durations as integers.', () => {
            request.setParams('durationFrom', correctDuration123);
            request.setParams('durationTo', correctDuration200);

            const result = getDurationParams(request);

            expect(result).toHaveProperty('from');
            expect(result).toHaveProperty('to');
            expect(result.from).toBe(123);
            expect(result.to).toBe(200);
        });

        test('Durations with spaces were passed. Should return correct values.', () => {
            const durationsWithSpaces = [numberWithSpaces, numberWithSpacesBothSides];

            durationsWithSpaces.forEach(value => {
                request.setParams('durationFrom', value);
                request.setParams('durationTo', value);

                const result = getDurationParams(request);
                expect(result.from).toBe(123);
                expect(result.to).toBe(123);
            })
        })
    });

    describe(`Errors expected`, () => {
        test('Invalid values were passed. Should throw an error.', () => {
            const incorrectDurationValues = [word, booleanStr];

            incorrectDurationValues.forEach(value => {
                request.setParams('durationFrom', value);
                request.setParams('durationTo', value);

                expect(() => getDurationParams(request)).toThrow(new BadRequestError(
                    400,
                    'Duration must be an integer number',
                ));
            })
        })
    });
})
