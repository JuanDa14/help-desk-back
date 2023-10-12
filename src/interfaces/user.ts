import { IArea } from './area';
import { IRole } from './role';

export interface IUser {
	_id: string;
	username: string;
	name: string;
	role: IRole;
	imageURL: string;
	state: boolean;
	address: string;
	password: string;
	area: IArea;
}
