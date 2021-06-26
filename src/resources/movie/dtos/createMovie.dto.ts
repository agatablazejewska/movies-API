import { Expose, Transform, Type } from 'class-transformer';
import {
    IsDefined, IsString, IsNotEmpty, MaxLength, IsNumberString, IsPositive, IsEnum,
    IsOptional, IsUrl, Length, ValidateIf, Matches, IsInt, Min, Max,
} from 'class-validator';
import { IsNotBlank } from '../validation/isNotBlank';
import { GENRES } from '../../../shared/enums/genres';
import { IMovieDto } from './IMovieDto';

export interface ICreateMovieDto extends IMovieDto {}

export default class CreateMovieDto implements ICreateMovieDto {
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
        message: `Actors have to be represented as string`,
    })
    @IsNotBlank()
    @IsNotEmpty()
    actors?: string;

    @IsOptional()
    @IsString()
    @IsNotBlank()
    @IsNotEmpty()
    plot?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNotBlank()
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