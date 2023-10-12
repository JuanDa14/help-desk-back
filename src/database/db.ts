import mongoose from 'mongoose';

export const dbConnected = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI!);
		console.log('MongoDB Connected');
	} catch (err) {
		if (err instanceof Error) {
			console.error(`Error: ${err.message}`);
			process.exit(1);
		}
	}
};
