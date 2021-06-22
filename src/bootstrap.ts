import MovieController from './resources/movie/movie.controller';
import JsonFileMovieRepository from './resources/movie/repos/jsonFileMovieRepository';
import MovieService from './resources/movie/services/movieService';
import { MovieLastIdSingleton } from './resources/movie/singletons/movieLastIdSingleton';
import LastMovieIdSingleton
    from './resources/movie/singletons/MovieLastIdSingletonForJsonFileRepository';

const jsonRepo = new JsonFileMovieRepository();
const movieService = new MovieService(jsonRepo, LastMovieIdSingleton);
export const movieController = new MovieController(movieService);