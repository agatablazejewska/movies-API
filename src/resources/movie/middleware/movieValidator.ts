import { plainToClass, plainToClassFromExist, serialize } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { validate, validateOrReject } from 'class-validator';
import CreateMovieDto from '../dtos/createMovie.dto';
import MovieDto from '../dtos/movie.dto';
import MovieMapper from '../mappers/movie.mapper';

export  default class MovieValidator {
    static async validateCreateMovie(req: Request, res: Response, next: NextFunction) {
        const validationOptions = {
            whitelist: true,
            forbidNonWhitelisted: true,
            forbidUnknownValues: true,
            skipMissingProperties: false,
            validationError: { target: false },
        }

        try {
            const createMovieDto: CreateMovieDto = req.body.dto;
            await validateOrReject(createMovieDto, validationOptions);
            next();
        } catch (errors) {
            console.log(errors);
           res.status(400).send(errors);
        }
    }
}
