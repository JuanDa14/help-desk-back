"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const field_1 = require("./field");
exports.loginValidator = [
    (0, express_validator_1.check)('username', 'El nombre de usuario es requerido').trim().not().isEmpty(),
    (0, express_validator_1.check)('password', 'La contraseña es requerida').trim().not().isEmpty().isLength({ min: 6 }),
    field_1.validateFields,
];
