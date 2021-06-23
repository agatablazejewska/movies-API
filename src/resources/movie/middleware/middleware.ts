import { isEnum, isInt, isPositive, max, min } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { GENRES } from '../../../shared/enums/genres';
import { ICreateMovieDto } from '../dtos/createMovie.dto';
import { convertGenresParamToArr, getDurationParams } from '../utils/reqParamsHelper';
import MovieValidator from '../validation/movieValidator';


export const createMovieValidate = async (req: Request, res: Response, next: NextFunction) => {
    const createMovieValidator = new MovieValidator<ICreateMovieDto>();

    try {
        await createMovieValidator.validate(req.body.dto);

        next();
    } catch (errors) {
        const error = {
            statusCode: 400,
            message: errors,
        }

        next(error);
    }

}

export const durationValidate = (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = getDurationParams(req);

    if(from < to) {
       res.status(400).json('Duration FROM number can not be greater than duration TO number').end();
    }

    validateIndividualDurationNumber(from, res, next);
    validateIndividualDurationNumber(to, res, next);

    next();
}

const validateIndividualDurationNumber = (duration: number, res: Response, next: NextFunction) => {
    const minDuration = 1;
    const maxDuration = 1000;

    if(!isInt(duration)) {
        const error = {
            statusCode: 400,
            message: 'Duration must be an integer number',
        }

        next(error);
    }

    if(!isPositive(duration)) {
        const error = {
            statusCode: 400,
            message: 'Duration must be a positive number',
        }

        next(error);
    }

    if(!max(duration, 1000)) {
        const error = {
            statusCode: 400,
            message: `Duration must be smaller than ${maxDuration}`,
        }

        next(error);
    }

    if(!min(duration, minDuration)) {
        const error = {
            statusCode: 400,
            message: `Duration must be equal or bigger than ${minDuration}`,
        }

        next(error);
    }
}

export const genresValidate = (req: Request, res: Response, next: NextFunction) => {
    const genres = convertGenresParamToArr(req);

    genres.forEach(genre => {
        if(!isEnum(genre, GENRES)) {
            const error = {
                statusCode: 400,
                message: 'At least some of provided genres are invalid',
            }

            next(error);
        }
    })

    next();
}