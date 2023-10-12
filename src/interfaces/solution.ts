export enum SolutionType {
	'Software' = 'Software',
	'Hardware' = 'Hardware',
	'Otros' = 'Otros',
}

export interface ISolution {
	_id: string;
	title: string;
	description: string;
	type: SolutionType;
	manual: string;
	problem: string;
}
