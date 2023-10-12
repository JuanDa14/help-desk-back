import { Schema, Model, models, model } from 'mongoose';
import { IArea } from '../interfaces';

const AreaSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			unique: true,
			uppercase: true,
			required: [true, 'El nombre es obligatorio'],
		},
		description: {
			type: String,
			trim: true,
			required: [true, 'La descripción es obligatoria'],
		},
		state: {
			type: Boolean,
			default: true,
			required: [true, 'El estado es obligatorio'],
		},
	},
	{
		timestamps: true,
	}
);

const Area: Model<IArea> = models.Area || model('Area', AreaSchema);

export default Area;
