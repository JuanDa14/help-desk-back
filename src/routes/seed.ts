import { Router } from 'express';
import { seedData } from '../controllers';

const router = Router();

router.get('/', seedData);

export default router;
