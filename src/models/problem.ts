import { Schema, Model, models, model } from 'mongoose';

import { IProblem, ProblemState, ProblemType } from '../interfaces';

const ProblemSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, 'El titulo es obligatorio'],
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'El descripcion es obligatorio'],
		},
		type: {
			type: String,
			enum: ProblemType,
			required: [true, 'El tipo es obligatorio'],
		},
		state: {
			type: String,
			enum: ProblemState,
			required: [true, 'El estado es obligatorio'],
			default: ProblemState.Pendiente,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: [true, 'El usuario es obligatorio'],
		},
	},
	{
		timestamps: true,
	}
);

const Problem: Model<IProblem> = models.Problem || model('Problem', ProblemSchema);

export default Problem;
