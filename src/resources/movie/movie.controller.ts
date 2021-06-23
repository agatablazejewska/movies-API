import { IGetMoviesDto } from './dtos/getMovies.dto';
import MovieMapper from './mappers/movie.mapper';
import MovieService from './services/movieService';

export default class MovieController {
    private _movieService: MovieService;

    constructor(movieService: MovieService) {
        this._movieService = movieService;
    }

    async createMovie(req, res) {
        const createdMovie = await this._movieService.create(req.body);

        res.json(createdMovie);
    }

    async getRandom(req, res) {
        const getMoviesDto = await this._movieService.getRandom();

        res.json(getMoviesDto);
    }

    async getByDuration(req, res) {
        const { from, to } = this._getDurationParams(req);
        const getMoviesDto = await this._movieService.getByDuration(from, to);

        res.json(getMoviesDto);
    }

    async getByGenres(req, res) {
        const genres = this._convertParamsToArr(req);

        const getMoviesDto = await this._movieService.getByGenres(genres);

        res.json(getMoviesDto);
    }

    async getByGenresAndDuration(req, res) {
        const genres = this._convertParamsToArr(req);
        const duration = this._getDurationParams(req);

        const getMoviesDto = await this._movieService.getByGenresAndDuration(genres, duration);

        res.json(getMoviesDto);
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
