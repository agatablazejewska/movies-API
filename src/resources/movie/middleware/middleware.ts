import { isEnum, isInt, isPositive, max, min } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { GENRES } from '../../../shared/enums/genres';
import { ICreateMovieDto } from '../dtos/createMovie.dto';
import BadRequestError from '../utils/badRequestError';
import { convertGenresParamToArr, getDurationParams } from '../utils/reqParamsHelper';
import MovieValidator from '../validation/movieValidator';


export const createMovieValidate = async (req: Request, res: Response, next: NextFunction) => {
    const createMovieValidator = new MovieValidator<ICreateMovieDto>();

    try {
        await createMovieValidator.validate(req.body.dto);

        next();
    } catch (errors) {
        const error =  new BadRequestError(400, errors);

        next(error);
    }

}

export const durationValidate = (req: Request, res: Response, next: NextFunction) => {
    const { from, to } = getDurationParams(req, next);

    _validateIndividualDurationNumber(from, res, next);
    _validateIndividualDurationNumber(to, res, next);

    _validateIsFromBiggerThanTo(from, to, next);

    next();
}

export const genresValidate = (req: Request, res: Response, next: NextFunction) => {
    const genres = convertGenresParamToArr(req);

    genres.forEach(genre => {
        if(!isEnum(genre, GENRES)) {
            const error =  new BadRequestError(
                400,
                'At least some of provided genres are invalid',
            )

            next(error);
        }
    })

    next();
}

const _validateIndividualDurationNumber = (duration: number, res: Response, next: NextFunction) => {
    const minDuration = 1;
    const maxDuration = 1000;

    if(!isInt(duration)) {
        const error =  new BadRequestError(
            400,
            'Duration must be an integer number',
        )

        next(error);
    }

    if(!isPositive(duration)) {
        const error =  new BadRequestError(
            400,
            'Duration must be a positive number',
        )

        next(error);
    }

    if(!max(duration, 1000)) {
        const error =  new BadRequestError(
            400,
            `Duration must be smaller than ${maxDuration}`,
        )

        next(error);
    }

    if(!min(duration, minDuration)) {
        const error =  new BadRequestError(
            400,
            `Duration must be equal or bigger than ${minDuration}`,
        )

        next(error);
    }
}

const _validateIsFromBiggerThanTo = (from: number, to: number, next: NextFunction) => {
    if (from > to) {
        const error = new BadRequestError(
            400,
            'Duration FROM number can not be greater than duration TO number',
        );

        next(error);
    }
}