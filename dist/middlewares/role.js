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
exports.getRoleValidator = exports.createRoleValidator = exports.isNotExistRoleById = exports.isExistRoleByName = void 0;
const express_validator_1 = require("express-validator");
const field_1 = require("./field");
const role_1 = __importDefault(require("../models/role"));
const isExistRoleByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const nameUppercase = name.toUpperCase();
    const role = yield role_1.default.findOne({ name: nameUppercase }).select('+_id').lean();
    if (role) {
        throw new Error(`Ya existe un rol con el nombre ${name}`);
    }
});
exports.isExistRoleByName = isExistRoleByName;
const isNotExistRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield role_1.default.findById(id).select('+_id').lean();
    if (!role) {
        throw new Error('No existe el rol');
    }
});
exports.isNotExistRoleById = isNotExistRoleById;
exports.createRoleValidator = [
    (0, express_validator_1.check)('name', 'El nombre es requerido').trim().not().isEmpty().isLength({ min: 3 }),
    (0, express_validator_1.check)('name').custom(exports.isExistRoleByName),
    field_1.validateFields,
];
exports.getRoleValidator = [
    (0, express_validator_1.check)('id', 'El id es requerido').trim().not().isEmpty().isMongoId(),
    (0, express_validator_1.check)('id').custom(exports.isNotExistRoleById),
    field_1.validateFields,
];
