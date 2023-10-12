import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Role from '../models/role';
import User from '../models/user';
import Area from '../models/area';
import Solution from '../models/solution';
import Problem from '../models/problem';
import Manual from '../models/manual';

export async function seedData(req: Request, res: Response) {
	try {
		if (process.env.NODE_ENV === 'production') {
			return res.status(401).json({ message: 'No tiene permisos' });
		}

		await Promise.all([
			User.deleteMany(),
			Role.deleteMany(),
			Area.deleteMany(),
			Solution.deleteMany(),
			Problem.deleteMany(),
			Manual.deleteMany(),
		]);

		//Roles
		const roles = await Role.insertMany([
			{ name: 'Administrador', description: 'Administrador del sistema' },
			{ name: 'Super Usuario', description: 'Super usuario del sistema' },
			{ name: 'Usuario', description: 'Usuario del sistema' },
		]);

		const areas = await Area.insertMany([
			{ name: 'Control Patrimonial', description: 'Administración de activos y bienes.' },
			{
				name: 'Tecnología de la información',
				description: 'Gestión de la información con tecnología.',
			},
		]);

		//Usuarios
		await User.insertMany([
			{
				name: 'Administrador',
				username: 'admin',
				password: bcrypt.hashSync('password', 10),
				role: roles[0]._id,
				address: 'Av. Pacasmayo',
				area: areas[1]._id,
			},
			{
				name: 'Super Usuario',
				username: 'superusuario',
				password: bcrypt.hashSync('password', 10),
				role: roles[1]._id,
				address: 'Av. San Juan',
				area: areas[0]._id,
			},
			{
				name: 'Usuario',
				username: 'usuario',
				password: bcrypt.hashSync('password', 10),
				role: roles[2]._id,
				address: 'Av. Tomas Valle',
				area: areas[0]._id,
			},
		]);

		return res.status(200).json({ message: 'Seed ejecutado correctamente' });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Error al ejecutar el seed' });
	}
}
