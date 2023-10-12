import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
	namespace Express {
		interface Request {
			id?: string;
		}
	}
}

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) return res.status(400).json({ ok: false, message: 'Falta algo en el header' });

	try {
		const { id } = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

		if (!id) return res.status(401).json({ ok: false, message: 'El token ha caducido' });

		req.id = id;

		next();
	} catch (error) {
		return res.status(500).json({ ok: false, message: 'Hay un problema con su acceso' });
	}
};
