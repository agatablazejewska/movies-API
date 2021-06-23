import { NextFunction, Request, Response } from 'express';
import { IMovieDto, IMovieDtoWithId } from '../dtos/IMovieDto';
import MovieMapper from '../mappers/movie.mapper';

export default class MovieTransformer {
    static transformBodyToCreateMovieDto(req: Request, res: Response, next: NextFunction) {
        const createMovieDto = MovieMapper.toCreateMovieDto(req.body);
        MovieTransformer._setTransformedObjAsBodyPropertyCalledDto(req, createMovieDto);

        next();
    }

    private static _setTransformedObjAsBodyPropertyCalledDto<T extends IMovieDto | IMovieDtoWithId>(req: Request, dto: T) {
        req.body.dto = dto;
    }

}