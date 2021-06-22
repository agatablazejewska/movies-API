import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto } from '../dtos/movie.dto';
import { IMovie, IMovieWithId } from '../movie.model';

export default interface IMovieRepository {
    create(movie: IMovieWithId): Promise<IMovieDto>;
    getMoviesByDuration(from: number, to: number): Promise<IGetMoviesDto>;
    getMoviesByGenres(genres: GENRES[]): Promise<IGetMoviesDto>;
    getMoviesByGenresAndDuration(genres: GENRES[], duration: {from: number, to: number}): Promise<IGetMoviesDto>;
    getAllMovies(): Promise<IGetMoviesDto>;
}