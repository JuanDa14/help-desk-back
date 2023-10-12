import { Router } from 'express';
import {
	createManual,
	deleteManual,
	getManual,
	getManuals,
	updateManual,
} from '../controllers/manual';
import { verifyJWT } from '../middlewares';

const router = Router();

router.use(verifyJWT);

router.get('/', getManuals);
router.get('/:id', getManual);
router.post('/', createManual);
router.patch('/:id', updateManual);
router.delete('/:id', deleteManual);

export default router;
