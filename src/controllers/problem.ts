import { Request, Response } from 'express';
import Problem from '../models/problem';
import User from '../models/user';
import { ValidRoles } from '../interfaces';

export const getProblems = async (req: Request, res: Response) => {
	try {
		const problems = await Problem.find()
			.sort({ createdAt: 'desc' })
			.populate({
				path: 'user',
				select: 'area name',
				populate: {
					path: 'area',
					select: 'name',
				},
			})
			.lean();

		return res.json(problems);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getProblem = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const problem = await Problem.findById(id)
			.populate({
				path: 'user',
				select: 'name area',
				populate: {
					path: 'area',
					select: 'name',
				},
			})
			.lean();
		return res.json(problem);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getProblemsByState = async (req: Request, res: Response) => {
	const { state } = req.params;

	try {
		const problems = await Problem.find({ state }).lean();
		return res.json(problems);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createProblem = async (req: Request, res: Response) => {
	const userId = req.id;

	try {
		const user = await User.findById(userId).lean();

		if (!user) {
			return res.status(404).json({ message: 'El usuario no existe' });
		}

		const problem = new Problem({ ...req.body, user: user._id });

		await problem.save();

		return res.json(problem);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateProblem = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = req.id;

	try {
		const user = await User.findById(userId).populate('role', 'name').lean();

		if (!user) {
			return res.status(404).json({ message: 'El usuario no existe' });
		}

		const problem = await Problem.findById(id).lean();

		if (!problem) {
			return res.status(404).json({ message: 'El problema no existe' });
		}

		const isAdmin = user.role.name === ValidRoles.ADMIN;

		if (problem.user.toString() !== userId && !isAdmin) {
			return res.status(401).json({ message: 'No tienes permiso para editar este problema' });
		}

		const problemUpdated = await Problem.findByIdAndUpdate(id, req.body, { new: true }).lean();

		return res.json(problemUpdated);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteProblem = async (req: Request, res: Response) => {
	const { id } = req.params;
	const userId = req.id;

	try {
		const user = await User.findById(userId).lean();

		if (!user) {
			return res.status(404).json({ message: 'El usuario no existe' });
		}

		const problem = await Problem.findById(id).lean();

		if (!problem) {
			return res.status(404).json({ message: 'El problema no existe' });
		}

		if (problem.user.toString() !== userId) {
			return res.status(401).json({ message: 'No tienes permiso para eliminar este problema' });
		}

		await Problem.findByIdAndDelete(id).lean();

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
