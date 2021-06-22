import { readJson, writeJson } from 'fs-extra';
import IDbSchema from '../../../database/IDbSchema';
import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto } from '../dtos/movie.dto';
import MovieMapper from '../mappers/movie.mapper';
import { IMovie, IMovieWithId } from '../movie.model';
import IMovieRepository from './IMovieRepository';
import { DB_FILE } from '../../../config';

export default class JsonFileMovieRepository implements IMovieRepository {
    async create(movie: IMovieWithId): Promise<IMovieDto> {
        const db: IDbSchema = await readJson(DB_FILE);
        db.movies.push(movie);

        await writeJson(DB_FILE, db, { spaces: 2 });

        return MovieMapper.toMovieDto(movie);
    }

    async getAllMovies(): Promise<IGetMoviesDto> {
        const movies = await this._getAllMoviesFromDB();

        return MovieMapper.toGetMoviesDto(movies);
    }

    async getMoviesByDuration(from: number, to: number): Promise<IGetMoviesDto> {
        const filtered = await this._filterAllMoviesByDuration(from, to);

        return MovieMapper.toGetMoviesDto(filtered);
    }

    async getMoviesByGenres(genres: GENRES[]): Promise<IGetMoviesDto> {
        const filtered = await this._filterAllMoviesByGenres(genres);

        return MovieMapper.toGetMoviesDto(filtered);
    }

    async getMoviesByGenresAndDuration(
        genres: GENRES[],
        duration: { from: number; to: number }
    ): Promise<IGetMoviesDto> {
        const filteredByGenres = await this._filterAllMoviesByGenres(genres);
        const filteredByDuration = await this._filterAllMoviesByDuration(
            duration.from,
            duration.to
        );
        const filteredByGenresAndDuration =
            filteredByGenres.concat(filteredByDuration);
        const unique = this._removeDuplicatesFromArrayById(
            filteredByGenresAndDuration
        );

        return MovieMapper.toGetMoviesDto(unique);
    }

    /*
        filterByDuration and filterByGenres became private methods,
        as they are also used to filter by genres AND duration.
        Usage of public methods for this purpose was possible, but it would generate unnecessary mapping.
        With lots of results(movies) it might have an impact on efficiency of the app.
    */
    private async _filterAllMoviesByDuration(from: number, to: number) {
        const movies = await this._getAllMoviesFromDB();

        const filtered = this._findBetweenDuration(movies, from, to);
        return filtered;
    }

    private async _filterAllMoviesByGenres(genres: GENRES[]) {
        const movies = await this._getAllMoviesFromDB();

        const filtered = movies.filter((movie) =>
            this._findCommonGenres(movie.genres, genres)
        );
        return filtered;
    }

    private async _getAllMoviesFromDB(): Promise<IMovieWithId[]> {
        const db: IDbSchema = await readJson(DB_FILE);
        const movies = db.movies;
        return movies;
    }

    private _findBetweenDuration(
        movies: IMovieWithId[],
        from: number,
        to: number
    ): IMovieWithId[] {
        const filtered = movies.filter(
            (movie) => movie.runtime >= from && movie.runtime <= to
        );
        return filtered;
    }

    private _findCommonGenres(genres1, genres2): boolean {
        return genres1.some((genre) => genres2.includes(genre));
    }

    private _removeDuplicatesFromArrayById(
        filteredByGenresAndDuration: IMovieWithId[]
    ) {
        const unique = [
            ...new Map(
                filteredByGenresAndDuration.map((movie) => [movie.id, movie])
            ).values(),
        ];
        return unique;
    }
}
