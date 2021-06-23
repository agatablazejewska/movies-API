import Router from 'express-promise-router';
import { movieController } from '../../bootstrap';
import MovieTransformer from './middleware/movieTransformer';
import MovieValidator from './middleware/movieValidator';

const router = Router();

router.get('/', async (req, res) => await movieController.getRandom(req, res));
router.get('/:durationFrom/:durationTo', async (req, res) => await movieController.getByDuration(req, res));
router.get('/:genres', async (req, res) => await movieController.getByGenres(req, res));
router.get('/:genres/:durationFrom/:durationTo', async (req, res) => await movieController.getByGenresAndDuration(req, res));
router.post('/',MovieTransformer.transformBodyToCreateMovieDto, MovieValidator.validateCreateMovie, async (req, res) => await movieController.createMovie(req, res));

export default router;