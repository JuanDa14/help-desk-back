import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import User from '../models/user';

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find().populate('role', 'name').populate('area', 'name').lean();
		return res.json(users);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const user = await User.findById(id).populate('role', 'name').populate('area', 'name').lean();
		return res.json(user);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createUser = async (req: Request, res: Response) => {
	const { name, username, password, role, imageUrl, address, area } = req.body;
	try {
		const user = new User({
			name,
			username,
			password,
			role,
			imageUrl,
			address,
			area,
		});
		await user.save();

		return res.json(user);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	const { password } = req.body;

	try {
		const userInDB = await User.findById(id).select('+password').lean();

		if (password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(password, salt);
		} else {
			req.body.password = userInDB?.password;
		}

		const user = await User.findByIdAndUpdate(id, req.body, { new: true })
			.populate('role', 'name')
			.lean();

		return res.json(user);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await User.findByIdAndDelete(id).lean();
		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
