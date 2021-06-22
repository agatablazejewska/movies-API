import CreateMovieDto, { ICreateMovieDto } from '../dtos/createMovie.dto';
import GetMoviesDto, { IGetMoviesDto } from '../dtos/getMovies.dto';
import MovieDto, { IMovieDto } from '../dtos/movie.dto';
import MovieModel, { IMovie, IMovieWithId } from '../movie.model';

export default class MovieMapper {
    public static toMovieDto(model: IMovieWithId): IMovieDto {
        return new MovieDto(model);
    }

    public static toCreateMovieDto(model: IMovieWithId): ICreateMovieDto {
        return new CreateMovieDto(model);
    }

    public static toGetMoviesDto(model: IMovieWithId[]): IGetMoviesDto {
        const MovieDtoArray = model.map((m) => this.toMovieDto(m));

        return new GetMoviesDto(MovieDtoArray);
    }

    public static toMovieModelFromMovieDto(movieDto: IMovieDto): IMovieWithId {
        return new MovieModel(movieDto);
    }

    public static toMovieModelFromCreateMovieDto(
        createMovieDto: ICreateMovieDto,
        newId: number
    ): IMovieWithId {
        return new MovieModel({ id: newId, ...createMovieDto });
    }
}
