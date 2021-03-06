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
        try {
            const allMoviesDto = await this._movieRepository.getAllMovies();
            const allMovies = allMoviesDto.movies;

            const lastIndex = allMovies.length - 1;
            const lastItemId = allMovies[lastIndex].id;

            return lastItemId;
        } catch {
            return 0;
        }
    }
}

const lastMovieIdSingleton = new MovieLastIdSingletonForJsonFileRepository(new JsonFileMovieRepository());
lastMovieIdSingleton.initializeLastId();
export default lastMovieIdSingleton;