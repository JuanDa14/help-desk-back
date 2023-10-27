export interface IRole {
	_id: string;
	name: string;
	description: string;
	state: boolean;
}

export enum ValidRoles {
	ADMIN = 'ADMINISTRADOR',
	USER = 'USUARIO',
	SUPER_USER = 'SUPER USUARIO',
}
