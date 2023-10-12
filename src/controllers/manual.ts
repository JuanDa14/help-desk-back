import { Request, Response } from 'express';
import Manual from '../models/manual';
import User from '../models/user';

export const getManuals = async (req: Request, res: Response) => {
	try {
		const manuals = await Manual.find()
			.sort({ createdAt: 'desc' })
			.populate('solution', 'title')
			.lean();
		return res.json(manuals);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getManual = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const manual = await Manual.findById(id).populate('solution', 'title').lean();
		return res.json(manual);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getManualsByState = async (req: Request, res: Response) => {
	const { state } = req.params;

	try {
		const manuals = await Manual.find({ state }).lean();
		return res.json(manuals);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createManual = async (req: Request, res: Response) => {
	const userId = req.id;

	try {
		const user = await User.findById(userId).lean();

		if (!user) {
			return res.status(404).json({ message: 'El usuario no existe' });
		}

		const manual = new Manual(req.body);

		await manual.save();

		return res.json(manual);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateManual = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const manual = await Manual.findById(id).lean();

		if (!manual) {
			return res.status(404).json({ message: 'El manuala no existe' });
		}

		const manualUpdated = await Manual.findByIdAndUpdate(id, req.body, { new: true }).lean();

		return res.json(manualUpdated);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteManual = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const manual = await Manual.findById(id).lean();

		if (!manual) {
			return res.status(404).json({ message: 'El manuala no existe' });
		}

		await Manual.findByIdAndDelete(id).lean();

		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
