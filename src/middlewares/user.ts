import { check } from 'express-validator';

import { isNotExistRoleById } from './role';
import { validateFields } from './field';
import User from '../models/user';

export const isExistUserByUsername = async (username: string) => {
	const user = await User.findOne({ username }).select('+_id').lean();

	if (user) {
		throw new Error(`El usuario ya está registrado`);
	}
};

const IsNotExistUserById = async (id: string) => {
	const user = await User.findById(id).select('+_id').lean();

	if (!user) {
		throw new Error('El usuario no existe');
	}
};

export const createUserValidator = [
	check('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
	check('username', 'El nombre de usuario es requerido').trim().not().isEmpty().isLength({ min: 3 }),
	check('password', 'La contraseña es requerida').trim().not().isEmpty().isLength({ min: 6 }),
	check('address').trim().not().isEmpty(),
	check('username').custom(isExistUserByUsername),
	check('role', 'El rol es requerido').trim().not().isEmpty().isMongoId(),
	check('role').custom(isNotExistRoleById),
	validateFields,
];

export const getUserValidator = [
	check('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
	check('id').custom(IsNotExistUserById),
	validateFields,
];
