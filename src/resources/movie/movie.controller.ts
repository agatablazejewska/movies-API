import { IGetMoviesDto } from './dtos/getMovies.dto';
import { IMovieDtoWithId } from './dtos/IMovieDto';
import { convertGenresParamToArr, getDurationParams } from './utils/reqParamsHelper';
import MovieValidator from './validation/movieValidator';
import MovieService from './services/movieService';

export default class MovieController {
    private _movieService: MovieService;
    private _movieDtoValidator: MovieValidator<IMovieDtoWithId>;
    private _getMoviesDtoValidator: MovieValidator<IGetMoviesDto>;

    constructor(movieService: MovieService) {
        this._movieService = movieService;
        this._movieDtoValidator = new MovieValidator<IMovieDtoWithId>();
        this._getMoviesDtoValidator = new MovieValidator<IGetMoviesDto>();
    }

    async createMovie(req, res) {
        const createdMovie = await this._movieService.create(req.body);
        await this._movieDtoValidator.validate(createdMovie);

        res.json(createdMovie);
    }

    async getRandom(req, res) {
        const getMoviesDto = await this._movieService.getRandom();
        await this._getMoviesDtoValidator.validate(getMoviesDto);

        res.json(getMoviesDto);
    }

    async getByDuration(req, res) {
        const { from, to } = getDurationParams(req);
        const getMoviesDto = await this._movieService.getByDuration(from, to);
        await this._getMoviesDtoValidator.validate(getMoviesDto);

        res.json(getMoviesDto);
    }

    async getByGenres(req, res) {
        const genres = convertGenresParamToArr(req);
        const getMoviesDto = await this._movieService.getByGenres(genres);
        await this._getMoviesDtoValidator.validate(getMoviesDto);

        res.json(getMoviesDto);
    }

    async getByGenresAndDuration(req, res) {
        const genres = convertGenresParamToArr(req);
        const duration = getDurationParams(req);
        const getMoviesDto = await this._movieService.getByGenresAndDuration(genres, duration);
        await this._getMoviesDtoValidator.validate(getMoviesDto);

        res.json(getMoviesDto);
    }
}
