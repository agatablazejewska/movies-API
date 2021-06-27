import { Type } from 'class-transformer';
import {
    IsDefined,
    IsEnum,
    IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, IsUrl,
    Length, Max,
    MaxLength, Min,
    MinLength,
} from 'class-validator';
import { GENRES } from '../../../shared/enums/genres';
import { IsNotBlank } from '../validation/isNotBlank';
import { IMovieDto, IMovieDtoWithId } from './IMovieDto';

export default class MovieDto implements IMovieDtoWithId {
    @IsInt()
    @IsPositive()
    readonly id: number;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    @MaxLength(255)
    title: string;

    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear())
    year: number;

    @IsInt()
    @Min(1)
    @Max(1000)
    @IsPositive()
    runtime: number;

    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
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
    @IsNotBlank()
    @IsNotEmpty()
    actors?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsNotBlank()
    plot?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNotBlank()
    @IsUrl()
    posterUrl?: string;

    constructor(movieDto: IMovieDtoWithId) {
        this.id = movieDto.id;
        this.title = movieDto.title;
        this.year = movieDto.year;
        this.runtime = movieDto.runtime;
        this.director = movieDto.director;
        this.genres = movieDto.genres;
        this.actors = movieDto.actors;
        this.plot = movieDto.plot;
        this.posterUrl = movieDto.posterUrl;
    }
}