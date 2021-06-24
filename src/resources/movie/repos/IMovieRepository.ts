import { GENRES } from '../../../shared/enums/genres';
import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto, IMovieDtoWithId } from '../dtos/IMovieDto';
import { IMovieWithId } from '../movie.model';

export default interface IMovieRepository {
    create(movie: IMovieWithId): Promise<IMovieDtoWithId>;
    getMoviesByDuration(from: number, to: number): Promise<IGetMoviesDto>;
    getMoviesByGenres(genres: GENRES[]): Promise<IGetMoviesDto>;
    getMoviesByGenresAndDuration(genres: GENRES[], duration: {from: number, to: number}): Promise<IGetMoviesDto>;
    getAllMovies(): Promise<IGetMoviesDto>;
}