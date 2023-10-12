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
exports.deleteProblem = exports.updateProblem = exports.createProblem = exports.getProblemsByState = exports.getProblem = exports.getProblems = void 0;
const problem_1 = __importDefault(require("../models/problem"));
const user_1 = __importDefault(require("../models/user"));
const getProblems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const problems = yield problem_1.default.find()
            .sort({ createdAt: 'desc' })
            .populate('user', 'name')
            .lean();
        return res.json(problems);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getProblems = getProblems;
const getProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const problem = yield problem_1.default.findById(id).populate('user', 'name').lean();
        return res.json(problem);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getProblem = getProblem;
const getProblemsByState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.params;
    try {
        const problems = yield problem_1.default.find({ state }).lean();
        return res.json(problems);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getProblemsByState = getProblemsByState;
const createProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    try {
        const user = yield user_1.default.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }
        const problem = new problem_1.default(Object.assign(Object.assign({}, req.body), { user: user._id }));
        yield problem.save();
        return res.json(problem);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createProblem = createProblem;
const updateProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.id;
    try {
        const user = yield user_1.default.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }
        const problem = yield problem_1.default.findById(id).lean();
        if (!problem) {
            return res.status(404).json({ message: 'El problema no existe' });
        }
        if (problem.user.toString() !== userId) {
            return res.status(401).json({ message: 'No tienes permiso para editar este problema' });
        }
        const problemUpdated = yield problem_1.default.findByIdAndUpdate(id, req.body, { new: true }).lean();
        return res.json(problemUpdated);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateProblem = updateProblem;
const deleteProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userId = req.id;
    try {
        const user = yield user_1.default.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }
        const problem = yield problem_1.default.findById(id).lean();
        if (!problem) {
            return res.status(404).json({ message: 'El problema no existe' });
        }
        if (problem.user.toString() !== userId) {
            return res.status(401).json({ message: 'No tienes permiso para eliminar este problema' });
        }
        yield problem_1.default.findByIdAndDelete(id).lean();
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteProblem = deleteProblem;
