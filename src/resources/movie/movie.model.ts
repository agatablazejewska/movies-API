import {
    IsDefined, IsEnum, IsInt, IsNotEmpty, IsNumberString, IsOptional, IsPositive,
    IsString, IsUrl, Matches, Max,
    MaxLength, Min,
} from 'class-validator';
import { GENRES } from '../../shared/enums/genres';
import IHasId from '../../utils/IHasId';
import { IMovieDto } from './dtos/IMovieDto';

export interface IMovie {
    title: string;
    year: string;
    runtime: string;
    director: string;
    genres: GENRES[];
    actors?: string;
    plot?: string;
    posterUrl?: string;
}
export interface IMovieWithId extends IMovie, IHasId {}

export default class MovieModel implements IMovieWithId {
    @IsInt()
    @IsPositive()
    readonly id: number;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255, {
        message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    title: string;

    @IsString()
    @IsNumberString({}, {
        message: `Year has to be a string but contain number info`,
    })
    @Matches(new RegExp('^(19|20)\\d{2}$'))
    year: string;

    @IsString()
    @IsNumberString({}, {
        message: `Runtime has to be a string but contain number info`,
    })
    @MaxLength(4)
    @IsNotEmpty()
    runtime: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255, {
        message: `Director's name is too long. Maximal length is $constraint1 characters, but actual is $value`,
    })
    director: string;

    @IsEnum(GENRES, {
        each: true,
    })
    genres: GENRES[];

    @IsOptional()
    @IsString({
        message: `Actors have to be represented a s string`,
    })
    @IsNotEmpty()
    actors?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    plot?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    posterUrl?: string;

    constructor(movie: IMovieWithId) {
        this.id = movie.id;
        this.title = movie.title;
        this.year = movie.year;
        this.runtime = movie.runtime;
        this.director = movie.director;
        this.genres = movie.genres;
        this.actors = movie.actors;
        this.plot = movie.plot;
        this.posterUrl = movie.posterUrl;
    }
}