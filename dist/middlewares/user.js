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
exports.getUserValidator = exports.createUserValidator = exports.isExistUserByUsername = void 0;
const express_validator_1 = require("express-validator");
const role_1 = require("./role");
const field_1 = require("./field");
const user_1 = __importDefault(require("../models/user"));
const isExistUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findOne({ username }).select('+_id').lean();
    if (user) {
        throw new Error(`El usuario ya está registrado`);
    }
});
exports.isExistUserByUsername = isExistUserByUsername;
const IsNotExistUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.default.findById(id).select('+_id').lean();
    if (!user) {
        throw new Error('El usuario no existe');
    }
});
exports.createUserValidator = [
    (0, express_validator_1.check)('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
    (0, express_validator_1.check)('username', 'El nombre de usuario es requerido').trim().not().isEmpty().isLength({ min: 3 }),
    (0, express_validator_1.check)('password', 'La contraseña es requerida').trim().not().isEmpty().isLength({ min: 6 }),
    (0, express_validator_1.check)('address').trim().not().isEmpty(),
    (0, express_validator_1.check)('username').custom(exports.isExistUserByUsername),
    (0, express_validator_1.check)('role', 'El rol es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('role').custom(role_1.isNotExistRoleById),
    field_1.validateFields,
];
exports.getUserValidator = [
    (0, express_validator_1.check)('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('id').custom(IsNotExistUserById),
    field_1.validateFields,
];
