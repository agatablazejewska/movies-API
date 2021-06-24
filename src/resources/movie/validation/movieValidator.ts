import { NextFunction, Request, Response } from 'express';
import { validate, validateOrReject } from 'class-validator';
import { convertToMeaningfulErrorsArray } from '../../../utils/errorHelper';
import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto, IMovieDtoWithId } from '../dtos/IMovieDto';
import { IMovie, IMovieWithId } from '../movie.model';

type movieInterfaces = IMovieDto | IMovieDtoWithId | IMovie | IMovieWithId | IGetMoviesDto;

export default class MovieValidator<T extends  movieInterfaces> {
    async validate(movie: T) {
        const validationOptions = {
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            skipMissingProperties: false,
            validationError: { target: false },
        }

        try {
            await validateOrReject(movie, validationOptions);
        } catch (errors) {
           const meaningfulErrors = convertToMeaningfulErrorsArray(errors);

           throw meaningfulErrors;
        }
    }


}
