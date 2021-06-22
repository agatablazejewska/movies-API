import { ICreateMovieDto } from '../dtos/createMovie.dto';
import GetMoviesDto, { IGetMoviesDto } from '../dtos/getMovies.dto';
import MovieDto from '../dtos/movie.dto';
import MovieMapper from '../mappers/movie.mapper';
import IMovieRepository from '../repos/IMovieRepository';
import { MovieLastIdSingleton } from '../singletons/movieLastIdSingleton';

export default class MovieService {
    private _repository: IMovieRepository;
    private _lastIdSingleton: MovieLastIdSingleton;

    constructor(repository: IMovieRepository, lastIdSingleton: MovieLastIdSingleton) {
        this._repository = repository;
        this._lastIdSingleton = lastIdSingleton;
    }

    async create(movie: ICreateMovieDto): Promise<MovieDto> {
        const newId = this._findNextAvailableId();
        const newMovie = MovieMapper.toMovieModelFromCreateMovieDto(movie, newId);

        return await this._repository.create(newMovie);
    }

    async getRandom(): Promise<IGetMoviesDto> {
        const moviesDto = await this._repository.getAllMovies();
        const allMovies = moviesDto.movies;
        const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];

        return new GetMoviesDto([randomMovie]);
    }

    async getByDuration(from: number, to: number): Promise<IGetMoviesDto> {
        return await this._repository.getMoviesByDuration(from, to);
    }

    async getByGenres(genres: GENRES[]): Promise<IGetMoviesDto> {
        return await this._repository.getMoviesByGenres(genres);
    }

    async getByGenresAndDuration(genres: GENRES[], duration: { from: number, to: number}): Promise<IGetMoviesDto> {
        return await this._repository.getMoviesByGenresAndDuration(genres, duration);
    }

    private _findNextAvailableId() {
        const lastId = this._lastIdSingleton.lastId;

        this._lastIdSingleton.increaseLastId();

        return lastId + 1;
    }
}