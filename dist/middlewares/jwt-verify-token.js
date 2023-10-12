"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyJWT = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(400).json({ ok: false, message: 'Falta algo en el header' });
    try {
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!id)
            return res.status(401).json({ ok: false, message: 'El token ha caducido' });
        req.id = id;
        next();
    }
    catch (error) {
        return res.status(500).json({ ok: false, message: 'Hay un problema con su acceso' });
    }
};
exports.verifyJWT = verifyJWT;
