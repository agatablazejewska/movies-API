import Router from 'express-promise-router';
import { movieController } from '../../bootstrap';
import {
    createMovieValidate,
    durationValidate,
    genresValidate,
} from './middleware/middleware';
import MovieTransformer from './middleware/movieTransformer';

const router = Router();

router.get('/', async (req, res) => await movieController.getRandom(req, res));
router.get(
    '/:durationFrom/:durationTo',
    durationValidate,
    async (req, res) => await movieController.getByDuration(req, res)
);
router.get(
    '/:genres',
    genresValidate,
    async (req, res) => await movieController.getByGenres(req, res)
);
router.get(
    '/:genres/:durationFrom/:durationTo',
    genresValidate,
    durationValidate,
    async (req, res) => await movieController.getByGenresAndDuration(req, res)
);
router.post(
    '/',
    MovieTransformer.transformBodyToCreateMovieDto,
    createMovieValidate,
    async (req, res) => await movieController.createMovie(req, res)
);

export default router;
