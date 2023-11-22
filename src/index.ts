import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { dbConnected } from './database/db';

import userRouter from './routes/user';
import authRouter from './routes/auth';
import roleRouter from './routes/role';
import seedRouter from './routes/seed';
import areaRouter from './routes/area';
import solutionRouter from './routes/solution';
import problemRouter from './routes/problem';
import manualRouter from './routes/manual';
import dashboardRouter from './routes/dashboard';

dotenv.config();

const corsOptions = {
	origin: process.env.FRONTEND_URL,
};

const app = express();
//Base de datos
dbConnected();

//Middlewares
// app.use(cors(process.env.NODE_ENV !== 'development' ? corsOptions : {}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: '/tmp/',
// 		createParentPath: true,
// 	})
// );

//Rutas
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/roles', roleRouter);
app.use('/api/seed', seedRouter);
app.use('/api/areas', areaRouter);
app.use('/api/solutions', solutionRouter);
app.use('/api/problems', problemRouter);
app.use('/api/manuals', manualRouter);
app.use('/api/dashboard', dashboardRouter);

//Servidor
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
