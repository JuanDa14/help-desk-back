import { Router } from 'express';

import { createRole, deleteRole, getRole, getRoles, updateRole } from '../controllers';

import { createRoleValidator, getRoleValidator } from '../middlewares';

const router = Router();

router.post('/', createRoleValidator, createRole);
router.get('/', getRoles);
router.get('/:id', getRoleValidator, getRole);
router.patch('/:id', getRoleValidator, updateRole);
router.delete('/:id', getRoleValidator, deleteRole);

export default router;
