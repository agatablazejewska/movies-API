import Router from 'express-promise-router';
import { movieController } from '../../bootstrap';

const router = Router();

router.get('/', async (req, res) => await movieController.getRandom(req, res));
router.get('/:durationFrom/:durationTo', async (req, res) => await movieController.getByDuration(req, res));
router.get('/:genres', async (req, res) => await movieController.getByGenres(req, res));
router.get('/:genres/:durationFrom/:durationTo', async (req, res) => await movieController.getByGenresAndDuration(req, res));
router.post('/', async (req, res) => await movieController.createMovie(req, res));

export default router;