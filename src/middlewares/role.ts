import { check } from 'express-validator';

import { validateFields } from './field';
import Role from '../models/role';

export const isExistRoleByName = async (name: string) => {
	const nameUppercase = name.toUpperCase();

	const role = await Role.findOne({ name: nameUppercase }).select('+_id').lean();

	if (role) {
		throw new Error(`Ya existe un rol con el nombre ${name}`);
	}
};

export const isNotExistRoleById = async (id: string) => {
	const role = await Role.findById(id).select('+_id').lean();

	if (!role) {
		throw new Error('No existe el rol');
	}
};

export const createRoleValidator = [
	check('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
	check('name').custom(isExistRoleByName),
	validateFields,
];

export const getRoleValidator = [
	check('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
	check('id').custom(isNotExistRoleById),
	validateFields,
];
