import { Request, Response } from 'express';
import Solution from '../models/solution';
import User from '../models/user';
import Problem from '../models/problem';
import { ProblemState } from '../interfaces';

export const getSolutions = async (req: Request, res: Response) => {
	try {
		const solutions = await Solution.find()
			.sort({ createdAt: 'desc' })
			.populate('problem', 'title')
			.lean();
		return res.json(solutions);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getSolution = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const solution = await Solution.findById(id).populate('problem', 'title').lean();
		return res.json(solution);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getSolutionByState = async (req: Request, res: Response) => {
	const { state } = req.params;

	try {
		const solutions = await Solution.find({ state }).lean();
		return res.json(solutions);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createSolution = async (req: Request, res: Response) => {
	const { problem: problemId } = req.body;

	try {
		const problem = await Problem.findById(problemId).lean();

		if (!problem) {
			return res.status(404).json({ message: 'El problema no existe' });
		}

		await Problem.findByIdAndUpdate(
			problemId,
			{ state: ProblemState.Resuelto },
			{ new: true }
		).lean();

		const solution = new Solution(req.body);

		await solution.save();

		return res.json(solution);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateSolution = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const solution = await Solution.findById(id).lean();

		if (!solution) {
			return res.status(404).json({ message: 'El solutiona no existe' });
		}

		const solutionUpdated = await Solution.findByIdAndUpdate(id, req.body, { new: true }).lean();

		return res.json(solutionUpdated);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteSolution = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const solution = await Solution.findById(id).lean();

		if (!solution) {
			return res.status(404).json({ message: 'El solutiona no existe' });
		}

		await Solution.findByIdAndDelete(id).lean();

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
