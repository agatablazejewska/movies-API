import { Expose, Transform, Type } from 'class-transformer';
import {
    IsDefined, IsString, IsNotEmpty, MaxLength, IsNumberString, IsPositive, IsEnum,
    IsOptional, IsUrl, Length, ValidateIf, Matches, IsInt, Min, Max,
} from 'class-validator';
import { GENRES } from '../../../shared/enums/genres';
import { IMovieDto } from './IMovieDto';

export interface ICreateMovieDto extends IMovieDto {}

export default class CreateMovieDto implements ICreateMovieDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
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

    constructor(createMovieDto: ICreateMovieDto) {
        this.title = createMovieDto.title;
        this.year = createMovieDto.year;
        this.runtime = createMovieDto.runtime;
        this.director = createMovieDto.director;
        this.genres = createMovieDto.genres;
        this.actors = createMovieDto.actors;
        this.plot = createMovieDto.plot;
        this.posterUrl = createMovieDto.posterUrl;
    }
}