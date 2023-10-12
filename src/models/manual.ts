import { Schema, Model, models, model } from 'mongoose';

import { IManual } from '../interfaces';

const ManualSchema = new Schema(
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
		description_solution: {
			type: String,
			required: [true, 'Los pasos de solucion son obligatorio'],
		},
		solution: {
			type: Schema.Types.ObjectId,
			ref: 'Solution',
			required: [true, 'La solucion es obligatoria'],
		},
	},
	{
		timestamps: true,
	}
);

const Manual: Model<IManual> = models.Manual || model('Manual', ManualSchema);

export default Manual;
