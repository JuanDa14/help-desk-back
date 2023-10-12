import { Router } from 'express';
import {
	createSolution,
	deleteSolution,
	getSolution,
	getSolutions,
	updateSolution,
} from '../controllers/solution';

const router = Router();

router.get('/', getSolutions);
router.get('/:id', getSolution);
router.post('/', createSolution);
router.patch('/:id', updateSolution);
router.delete('/:id', deleteSolution);

export default router;
