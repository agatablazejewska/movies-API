import { GENRES } from '../../../shared/enums/genres';
import IHasId from '../../../utils/IHasId';

export interface IMovieDto {
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: GENRES[];
    actors?: string;
    plot?: string;
    posterUrl?: string;
}

export interface IMovieDtoWithId extends IMovieDto, IHasId {}