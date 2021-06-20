import { readJson, writeJson } from 'fs-extra';
import { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto } from '../dtos/movie.dto';
import { IMovie } from '../movie.model';
import IMovieRepository from './IMovieRepository';
import { DB_FILE } from '../../../config';

export default class JsonFileMovieRepository implements IMovieRepository {
    async create(movie: IMovie): Promise<IMovieDto> {
        const db = await readJson(DB_FILE);
        db.movies.push(movie);

        await writeJson(DB_FILE, db, { spaces: 2 });

        return movie;
    }

    async getMovies(genres?: GENRES[], duration?: number): Promise<IGetMoviesDto> {
        return Promise.resolve(undefined);
    }

}