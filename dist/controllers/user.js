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
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find().populate('role', 'name').populate('area', 'name').lean();
        return res.json(users);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findById(id).populate('role', 'name').populate('area', 'name').lean();
        return res.json(user);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, username, password, role, imageUrl, address, area } = req.body;
    try {
        const user = new user_1.default({
            name,
            username,
            password,
            role,
            imageUrl,
            address,
            area,
        });
        yield user.save();
        return res.json(user);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const userInDB = yield user_1.default.findById(id).select('+password').lean();
        if (password) {
            const salt = yield bcrypt_1.default.genSalt(10);
            req.body.password = yield bcrypt_1.default.hash(password, salt);
        }
        else {
            req.body.password = userInDB === null || userInDB === void 0 ? void 0 : userInDB.password;
        }
        const user = yield user_1.default.findByIdAndUpdate(id, req.body, { new: true })
            .populate('role', 'name')
            .lean();
        return res.json(user);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield user_1.default.findByIdAndDelete(id).lean();
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteUser = deleteUser;
