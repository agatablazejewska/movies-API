import { ValidateNested } from 'class-validator';
import MovieDto from './movie.dto';

interface GetMoviesDto {
    movies: MovieDto[];
}

class GetMoviesDto {
    @ValidateNested({
        each: true,
    })
    movies: MovieDto[];
}