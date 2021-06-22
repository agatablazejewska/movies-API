import { IMovieWithId } from '../resources/movie/movie.model';

export default interface IDbSchema {
    genres: string[];
    movies: IMovieWithId[];
}
