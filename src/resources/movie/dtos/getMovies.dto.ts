import { ValidateNested } from 'class-validator';
import MovieDto from './movie.dto';

export interface IGetMoviesDto {
    movies: MovieDto[];
}

export default class GetMoviesDto implements IGetMoviesDto {
    @ValidateNested({
        each: true,
    })
    movies: MovieDto[];
}