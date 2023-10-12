import { Router } from 'express';

import { loginUser, refreshTokenUser } from '../controllers';
import { verifyJWT, loginValidator } from '../middlewares';

const router = Router();

router.post('/login', loginValidator, loginUser);
router.get('/refresh-token', verifyJWT, refreshTokenUser);

export default router;
