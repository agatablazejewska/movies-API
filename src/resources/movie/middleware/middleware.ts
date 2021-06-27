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
    try {
        const { from, to } = getDurationParams(req);

        _validateIndividualDurationNumber(from);
        _validateIndividualDurationNumber(to);

        _validateIsFromBiggerThanTo(from, to);

        next();
    } catch(e) {
        next(e);
    }

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

const _validateIndividualDurationNumber = (duration: number) => {
    const minDuration = 1;
    const maxDuration = 1000;

    if(!isInt(duration)) {
        throw new BadRequestError(
            400,
            'Duration must be an integer number',
        )
    }

    if(!isPositive(duration)) {
        throw new BadRequestError(
            400,
            'Duration must be a positive number',
        )
    }

    if(!max(duration, 1000)) {
        throw new BadRequestError(
            400,
            `Duration must be smaller than ${maxDuration}`,
        )
    }

    if(!min(duration, minDuration)) {
        throw new BadRequestError(
            400,
            `Duration must be equal or bigger than ${minDuration}`,
        )
    }
}

const _validateIsFromBiggerThanTo = (from: number, to: number) => {
    if (from > to) {
        throw new BadRequestError(
            400,
            'Duration FROM number can not be greater than duration TO number',
        );
    }
}