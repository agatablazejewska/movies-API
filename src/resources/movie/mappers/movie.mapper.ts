import CreateMovieDto, { ICreateMovieDto } from '../dtos/createMovie.dto';
import GetMoviesDto, { IGetMoviesDto } from '../dtos/getMovies.dto';
import { IMovieDto, IMovieDtoWithId } from '../dtos/IMovieDto';
import MovieDto from '../dtos/movie.dto';
import MovieModel, { IMovieWithId } from '../movie.model';

export default class MovieMapper {
    public static toMovieDto(model: IMovieWithId): IMovieDtoWithId {
        const dto = this._parsePropsToMatchDtoSchema(model);

        return new MovieDto(dto);
    }

    public static toCreateMovieDto(model: IMovieDto): ICreateMovieDto {
        return new CreateMovieDto(model);
    }

    public static toGetMoviesDto(model: IMovieWithId[]): IGetMoviesDto {
        const movieDtoArray = model.map((m) => this.toMovieDto(m));

        return new GetMoviesDto(movieDtoArray);
    }

    public static toMovieModelFromMovieDto(movieDto: IMovieDtoWithId): IMovieWithId {
        const model = this._stringifyPropsToMatchModelSchema(movieDto);
        const newModel = new MovieModel(model);
        return newModel;
    }

    public static toMovieModelFromCreateMovieDto(
        createMovieDto: ICreateMovieDto,
        newId: number
    ): IMovieWithId {
        const model = this._stringifyPropsToMatchModelSchema(createMovieDto);
        const newModel = new MovieModel({ id: newId, ...model });

        return newModel
    }

    private static _parsePropsToMatchDtoSchema(model: IMovieWithId) {
        const runtime = parseInt(model.runtime);
        const year = parseInt(model.year);
        const dto = { ...model, runtime, year };
        return dto;
    }

    private static _stringifyPropsToMatchModelSchema<T extends IMovieDto | IMovieDtoWithId>(movieDto: T) {
        const runtime = movieDto.runtime.toString();
        const year = movieDto.year.toString();
        const dto = { ...movieDto, runtime, year };
        return dto;
    }
}
