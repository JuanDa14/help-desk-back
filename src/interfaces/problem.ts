export enum ProblemType {
	'Software' = 'Software',
	'Hardware' = 'Hardware',
	'Otros' = 'Otros',
}

export enum ProblemState {
	'Pendiente' = 'Pendiente',
	'En proceso' = 'En proceso',
	'Resuelto' = 'Resuelto',
}

export interface IProblem {
	_id: string;
	title: string;
	description: string;
	type: ProblemType;
	state: ProblemState;
	user: string;
}
