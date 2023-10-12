import { Schema, Model, models, model } from 'mongoose';
import bcrypt from 'bcrypt';

import { IUser } from '../interfaces';

const UserSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
			unique: true,
			trim: true,
		},
		name: {
			type: String,
			required: [true, 'El nombre es obligatorio'],
		},
		password: {
			type: String,
			required: [true, 'La contraseña es obligatoria'],
			select: false,
		},
		imageURL: {
			type: String,
			default:
				'https://res.cloudinary.com/dbvyaguam/image/upload/v1693714866/default-avatar-profile_uqi3ai.webp',
		},
		state: {
			type: Boolean,
			default: true,
			required: [true, 'El estado es obligatorio'],
		},
		address: {
			type: String,
			required: [true, 'La dirección es obligatoria'],
		},
		role: {
			type: Schema.Types.ObjectId,
			ref: 'Role',
			required: [true, 'El rol es obligatorio'],
		},
		area: {
			type: Schema.Types.ObjectId,
			ref: 'Area',
			required: [true, 'El area es obligatorio'],
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.pre('save', function (next) {
	const user = this;

	if (!user.isModified('password')) return next();

	bcrypt.genSalt(function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password!, salt, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

const User: Model<IUser> = models.User || model('User', UserSchema);

export default User;
