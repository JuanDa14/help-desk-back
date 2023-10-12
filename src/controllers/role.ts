import { Request, Response } from 'express';
import Role from '../models/role';

export const createRole = async (req: Request, res: Response) => {
	const { name } = req.body;

	try {
		const role = new Role({ name });
		await role.save();

		res.json(role);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getRoles = async (req: Request, res: Response) => {
	try {
		const roles = await Role.find().lean();
		return res.json(roles);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getRole = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const role = await Role.findById(id).lean();
		return res.json(role);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateRole = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const role = await Role.findByIdAndUpdate(id, req.body, { new: true }).lean();
		return res.json(role);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteRole = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await Role.findByIdAndDelete(id);

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
