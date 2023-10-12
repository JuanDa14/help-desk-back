import { Request, Response } from 'express';
import Area from '../models/area';

export const getAreas = async (req: Request, res: Response) => {
	try {
		const areas = await Area.find().lean();
		return res.json(areas);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const getArea = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const area = await Area.findById(id).lean();
		return res.json(area);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const createArea = async (req: Request, res: Response) => {
	try {
		const area = new Area(req.body);

		await area.save();

		return res.json(area);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const updateArea = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const area = await Area.findByIdAndUpdate(id, req.body, { new: true }).lean();
		return res.json(area);
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};

export const deleteArea = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		await Area.findByIdAndDelete(id).lean();
		return res.json({
			ok: true,
		});
	} catch (error) {
		return res.json({ message: 'Error interno del servidor' });
	}
};
