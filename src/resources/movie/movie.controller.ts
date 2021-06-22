import { IGetMoviesDto } from './dtos/getMovies.dto';
import { IMovieDto } from './dtos/movie.dto';
import MovieMapper from './mappers/movie.mapper';
import MovieService from './services/movieService';

export default class MovieController {
    private _movieService: MovieService;

    constructor(movieService: MovieService) {
        this._movieService = movieService;
    }

    async createMovie(req, res): Promise<IMovieDto> {
        const createMovieDto = MovieMapper.toCreateMovieDto(req.body);
        const createdMovie = await this._movieService.create(createMovieDto);

        return createdMovie;
    }

    async getRandom(req, res): Promise<IGetMoviesDto> {
        const getMoviesDto = await this._movieService.getRandom();

        return getMoviesDto;
    }

    async getByDuration(req, res): Promise<IGetMoviesDto> {
        const { from, to } = this._getDurationParams(req);
        const getMoviesDto = await this._movieService.getByDuration(from, to);

        return getMoviesDto;
    }

    async getByGenres(req, res): Promise<IGetMoviesDto> {
        const genres = this._convertParamsToArr(req);

        const getMoviesDto = await this._movieService.getByGenres(genres);

        return getMoviesDto;
    }

    async getByGenresAndDuration(req, res): Promise<IGetMoviesDto> {
        const genres = this._convertParamsToArr(req);
        const duration = this._getDurationParams(req);

        const getMoviesDto = await this._movieService.getByGenresAndDuration(genres, duration);

        return getMoviesDto;
    }

    private _getDurationParams(req): { from: number; to: number } {
        const from = req.params.durationFrom;
        const to = req.params.durationTo;

        return { from, to };
    }

    private _convertParamsToArr(req) {
        const genres = req.params.genres.split(',');
        return genres;
    }
}
