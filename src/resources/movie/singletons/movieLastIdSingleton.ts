import IMovieRepository from '../repos/IMovieRepository';

export abstract class MovieLastIdSingleton {
    protected _movieRepository: IMovieRepository;
    protected _lastId: number;

    abstract initializeLastId(): Promise<void>;

    get lastId(): number {
        return this._lastId;
    }

    increaseLastId() {
        this._lastId++;
    }
}