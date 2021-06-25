import { Request } from 'express';
import { GENRES } from '../../../shared/enums/genres';
import BadRequestError from './badRequestError';

export const convertGenresParamToArr = (req: Request): GENRES[] => {
    const genres = req.params.genres.split(',');
    return genres as GENRES[];
};

export const getDurationParams = (req): { from: number; to: number } => {
    try {
        const from = parseInt(req.params.durationFrom);
        const to = parseInt(req.params.durationTo);

        return { from, to };
    } catch {
        throw new BadRequestError(
            400,
            'Duration must be an integer number',
        )
    }
}
