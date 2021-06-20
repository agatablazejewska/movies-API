import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto } from '../dtos/movie.dto';
import { IMovie } from '../movie.model';

export default interface IMovieRepository {
    create(movie: IMovie): Promise<IMovieDto>;
    getMovies(genres?: GENRES[], duration?: number): Promise<IGetMoviesDto>;
}