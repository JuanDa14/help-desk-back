import { check } from 'express-validator';

import { validateFields } from './field';

export const loginValidator = [
	check('username', 'El nombre de usuario es requerido').trim().not().isEmpty(),
	check('password', 'La contraseña es requerida').trim().not().isEmpty().isLength({ min: 6 }),
	validateFields,
];
