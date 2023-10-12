import { Schema, Model, models, model } from 'mongoose';

import { ISolution, SolutionType } from '../interfaces';

const SolutionSchema = new Schema(
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
			enum: SolutionType,
			required: [true, 'El tipo es obligatorio'],
		},
		problem: {
			type: Schema.Types.ObjectId,
			ref: 'Problem',
			required: [true, 'El problema es obligatorio'],
		},
		manual: {
			type: Schema.Types.ObjectId,
			ref: 'Manual',
		},
	},
	{
		timestamps: true,
	}
);

const Solution: Model<ISolution> = models.Solution || model('Solution', SolutionSchema);

export default Solution;
