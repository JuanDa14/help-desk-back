import { Router } from 'express';
import {
	createProblem,
	deleteProblem,
	getProblem,
	getProblems,
	getProblemsByState,
	updateProblem,
} from '../controllers/problem';
import { verifyJWT } from '../middlewares';

const router = Router();

router.use(verifyJWT);

router.get('/', getProblems);
router.get('/:id', getProblem);
router.get('/state/:state', getProblemsByState);
router.post('/', createProblem);
router.patch('/:id', updateProblem);
router.delete('/:id', deleteProblem);

export default router;
