import IMovieRepository from '../repos/IMovieRepository';
import JsonFileMovieRepository from '../repos/jsonFileMovieRepository';
import { MovieLastIdSingleton } from './movieLastIdSingleton';

class MovieLastIdSingletonForJsonFileRepository extends MovieLastIdSingleton {
    constructor(movieRepository: IMovieRepository) {
        super();
        this._movieRepository = movieRepository;
    }

    async initializeLastId(): Promise<void> {
        this._lastId = await this._getLastMovieId();
    }

    private async _getLastMovieId() {
        const allMoviesDto = await this._movieRepository.getAllMovies();
        const allMovies = allMoviesDto.movies;

        const lastIndex = allMovies.length - 1;
        const lastItemId = allMovies[lastIndex].id;

        return lastItemId;
    }
}

const LastMovieIdSingleton = new MovieLastIdSingletonForJsonFileRepository(new JsonFileMovieRepository());
export default LastMovieIdSingleton;