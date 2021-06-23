import { Request } from 'express';
import { GENRES } from '../../../shared/enums/genres';

export const convertGenresParamToArr = (req: Request): GENRES[] => {
    const genres = req.params.genres.split(',');
    return genres as GENRES[];
};

export const getDurationParams = (req): { from: number; to: number } => {
    const from = req.params.durationFrom;
    const to = req.params.durationTo;

    return { from, to };
}
