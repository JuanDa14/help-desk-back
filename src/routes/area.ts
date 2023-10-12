import { Router } from 'express';
import { createArea, deleteArea, getArea, getAreas, updateArea } from '../controllers/area';

const router = Router();

router.get('/', getAreas);
router.get('/:id', getArea);
router.post('/', createArea);
router.patch('/:id', updateArea);
router.delete('/:id', deleteArea);

export default router;
