import { readJson, writeJson } from 'fs-extra';
import IDbSchema from '../../../database/IDbSchema';
import { GENRES } from '../../../shared/enums/genres';
import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto, IMovieDtoWithId } from '../dtos/IMovieDto';
import MovieMapper from '../mappers/movie.mapper';
import { IMovieWithId } from '../movie.model';
import IMovieRepository from './IMovieRepository';
import { DB_FILE } from '../../../config';

export default class JsonFileMovieRepository implements IMovieRepository {
    async create(movie: IMovieWithId): Promise<IMovieDtoWithId> {
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
        filtered.sort(this._compareByMatchingGenresNumber(genres));

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
        const allFiltered = filteredByGenres.concat(filteredByDuration);

        const uniqueSorted = this._removeDuplicatesAndSortByGenresMatch(allFiltered, genres);

        return MovieMapper.toGetMoviesDto(uniqueSorted);
    }

    private _removeDuplicatesAndSortByGenresMatch(allFiltered: IMovieWithId[], genres: GENRES[]) {
        const unique = this._removeDuplicatesFromArrayById(allFiltered);
        unique.sort(this._compareByMatchingGenresNumber(genres));

        return unique;
    }

    /*
        filterByDuration and filterByGenres became private methods,
        as they are also used to filter by genres AND duration.
        Usage of public methods for this purpose was possible, but it would generate unnecessary mapping.
        With lots of results(movies) it might have an impact on efficiency of the app.
    */
    private async _filterAllMoviesByDuration(
        from: number,
        to: number
    ): Promise<IMovieWithId[]> {
        const movies = await this._getAllMoviesFromDB();

        const filtered = this._findBetweenDuration(movies, from, to);
        return filtered;
    }

    private async _filterAllMoviesByGenres(
        genres: GENRES[]
    ): Promise<IMovieWithId[]> {
        const movies = await this._getAllMoviesFromDB();

        const filtered = movies.filter((movie) =>
            this._findCommonGenres(movie.genres, genres)
        );
        return filtered;
    }

    private async _getAllMoviesFromDB(): Promise<IMovieWithId[]> {
        const db: IDbSchema = await readJson(DB_FILE);
        const movies = db.movies;

        if(!movies || !movies.length) {
            throw new Error('There are no movies in the database');
        }
        return movies;
    }

    private _findBetweenDuration(
        movies: IMovieWithId[],
        from: number,
        to: number
    ): IMovieWithId[] {
        const filtered = movies.filter(
            movie => parseInt(movie.runtime) >= from && parseInt(movie.runtime) <= to
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

    private _compareByMatchingGenresNumber(genres: GENRES[]) {
        return (movieA: IMovieWithId, movieB: IMovieWithId) => {
            const movieAIntersectingGenresNumber =
                this._findMovieGenresAndSpecifiedGenresIntersectionsAmount(
                    movieA,
                    genres
                );
            const movieBIntersectingGenresNumber =
                this._findMovieGenresAndSpecifiedGenresIntersectionsAmount(
                    movieB,
                    genres
                );

            return this._compareIntersectionsAmount(movieAIntersectingGenresNumber, movieBIntersectingGenresNumber);
        };
    }

    private _compareIntersectionsAmount(
        movieAIntersectingGenresNumber: number,
        movieBIntersectingGenresNumber: number)
    : number {
        if (movieAIntersectingGenresNumber > movieBIntersectingGenresNumber) {
            return -1;
        }
        if (movieAIntersectingGenresNumber < movieBIntersectingGenresNumber) {
            return 1;
        }

        return 0;
    }

    private _findMovieGenresAndSpecifiedGenresIntersectionsAmount(
        movie: IMovieWithId,
        genres: GENRES[]
    ): number {
        const intersection = movie.genres.filter((genre) => genres.includes(genre));

        return intersection.length;
    }
}
