import { NextFunction, Request, Response } from 'express';
import { validate, validateOrReject } from 'class-validator';
import { convertToMeaningfulErrorsArray } from '../../../utils/errorHelper';
import { IMovieDto, IMovieDtoWithId } from '../dtos/IMovieDto';
import { IMovie, IMovieWithId } from '../movie.model';

type movieInterfaces = IMovieDto | IMovieDtoWithId | IMovie | IMovieWithId;

export default class MovieValidator<T extends  movieInterfaces> {
    async validateMovie(req: Request, res: Response, next: NextFunction) {
        const validationOptions = {
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            skipMissingProperties: false,
            validationError: { target: false },
        }

        try {
            const obj: T = req.body.dto;
            await validateOrReject(obj, validationOptions);
            next();
        } catch (errors) {
           const meaningfulErrors = convertToMeaningfulErrorsArray(errors);

           res.status(400).json(meaningfulErrors);
        }
    }


}
