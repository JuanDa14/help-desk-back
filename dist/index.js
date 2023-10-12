"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./database/db");
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const role_1 = __importDefault(require("./routes/role"));
const seed_1 = __importDefault(require("./routes/seed"));
const area_1 = __importDefault(require("./routes/area"));
const solution_1 = __importDefault(require("./routes/solution"));
const problem_1 = __importDefault(require("./routes/problem"));
const manual_1 = __importDefault(require("./routes/manual"));
dotenv_1.default.config();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
};
const app = (0, express_1.default)();
//Base de datos
(0, db_1.dbConnected)();
//Middlewares
// app.use(cors(process.env.NODE_ENV !== 'development' ? corsOptions : {}));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: '/tmp/',
// 		createParentPath: true,
// 	})
// );
//Rutas
app.use('/api/users', user_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/roles', role_1.default);
app.use('/api/seed', seed_1.default);
app.use('/api/areas', area_1.default);
app.use('/api/solutions', solution_1.default);
app.use('/api/problems', problem_1.default);
app.use('/api/manuals', manual_1.default);
//Servidor
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
