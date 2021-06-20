import { Type } from 'class-transformer';
import {
    IsEnum,
    IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, IsUrl,
    Length,
    MaxLength,
    MinLength,
} from 'class-validator';

interface ICreateMovieDto {
    title: string;
    year: number;
    runtime: number;
    director: string;
    genres: GENRES[];
    actors?: string;
    plot?: string;
    posterUrl?: string;
}

export default class CreateMovieDto implements ICreateMovieDto {
    @IsString({
        message: 'Title should be a string',
    })
    @IsNotEmpty({
        message: `Title can't be an empty string`,
    })
    @MaxLength(255, {
        message: 'Title is too long. Maximal length is $constraint1 characters, but actual is $value',
    })
    title: string;

    @IsNumberString()
    @Length(4, 4, {
        message: 'Year must contain only 4 characters'
    })
    @Type(() => Number)
    year: number;

    @IsNumberString()
    @Type(() => Number)
    @IsPositive({
        message: `Runtime can't be a negative value`,
    })
    runtime: number;

    @IsString({
        message: `Director's name has to be a string`,
    })
    @IsNotEmpty({
        message: `Director's name can't be an empty string`,
    })
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
    @IsNotEmpty({
        message: `Actors can't be an empty string`,
    })
    actors?: string;

    @IsOptional()
    @IsString({
        message: `Plot has to be a string`,
    })
    @IsNotEmpty({
        message: `Plot can't be an empty string`,
    })
    plot?: string;

    @IsOptional()
    @IsNotEmpty({
        message: `Url of the poster can't be an empty string`,
    })
    @IsUrl({}, {
        message: `Poster's url has an invalid format`,
    })
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