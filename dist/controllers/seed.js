"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const role_1 = __importDefault(require("../models/role"));
const user_1 = __importDefault(require("../models/user"));
const area_1 = __importDefault(require("../models/area"));
const solution_1 = __importDefault(require("../models/solution"));
const problem_1 = __importDefault(require("../models/problem"));
const manual_1 = __importDefault(require("../models/manual"));
function seedData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (process.env.NODE_ENV === 'production') {
                return res.status(401).json({ message: 'No tiene permisos' });
            }
            yield Promise.all([
                user_1.default.deleteMany(),
                role_1.default.deleteMany(),
                area_1.default.deleteMany(),
                solution_1.default.deleteMany(),
                problem_1.default.deleteMany(),
                manual_1.default.deleteMany(),
            ]);
            //Roles
            const roles = yield role_1.default.insertMany([
                { name: 'Administrador', description: 'Administrador del sistema' },
                { name: 'Super Usuario', description: 'Super usuario del sistema' },
                { name: 'Usuario', description: 'Usuario del sistema' },
            ]);
            const areas = yield area_1.default.insertMany([
                { name: 'Control Patrimonial', description: 'Administración de activos y bienes.' },
                {
                    name: 'Tecnología de la información',
                    description: 'Gestión de la información con tecnología.',
                },
            ]);
            //Usuarios
            yield user_1.default.insertMany([
                {
                    name: 'Administrador',
                    username: 'admin',
                    password: bcrypt_1.default.hashSync('password', 10),
                    role: roles[0]._id,
                    address: 'Av. Pacasmayo',
                    area: areas[1]._id,
                },
                {
                    name: 'Super Usuario',
                    username: 'superusuario',
                    password: bcrypt_1.default.hashSync('password', 10),
                    role: roles[1]._id,
                    address: 'Av. San Juan',
                    area: areas[0]._id,
                },
                {
                    name: 'Usuario',
                    username: 'usuario',
                    password: bcrypt_1.default.hashSync('password', 10),
                    role: roles[2]._id,
                    address: 'Av. Tomas Valle',
                    area: areas[0]._id,
                },
            ]);
            return res.status(200).json({ message: 'Seed ejecutado correctamente' });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Error al ejecutar el seed' });
        }
    });
}
exports.seedData = seedData;
