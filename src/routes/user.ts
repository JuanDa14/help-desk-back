import { Router } from 'express';

import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers';

import { createUserValidator, getUserValidator } from '../middlewares';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserValidator, getUser);
router.post('/', createUserValidator, createUser);
router.patch('/:id', getUserValidator, updateUser);
router.delete('/:id', getUserValidator, deleteUser);

export default router;
