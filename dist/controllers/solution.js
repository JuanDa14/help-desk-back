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
exports.deleteSolution = exports.updateSolution = exports.createSolution = exports.getSolutionByState = exports.getSolution = exports.getSolutions = void 0;
const solution_1 = __importDefault(require("../models/solution"));
const problem_1 = __importDefault(require("../models/problem"));
const interfaces_1 = require("../interfaces");
const getSolutions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const solutions = yield solution_1.default.find()
            .sort({ createdAt: 'desc' })
            .populate({
            path: 'problem',
            select: 'title user',
            populate: {
                path: 'user',
                select: 'area',
                populate: {
                    path: 'area',
                    select: 'name',
                },
            },
        })
            .lean();
        return res.json(solutions);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getSolutions = getSolutions;
const getSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const solution = yield solution_1.default.findById(id)
            .populate({
            path: 'problem',
            select: 'title user',
            populate: {
                path: 'user',
                select: 'area',
                populate: {
                    path: 'area',
                    select: 'name',
                },
            },
        })
            .lean();
        return res.json(solution);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getSolution = getSolution;
const getSolutionByState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.params;
    try {
        const solutions = yield solution_1.default.find({ state }).lean();
        return res.json(solutions);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getSolutionByState = getSolutionByState;
const createSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { problem: problemId } = req.body;
    try {
        const problem = yield problem_1.default.findById(problemId).lean();
        if (!problem) {
            return res.status(404).json({ message: 'El problema no existe' });
        }
        yield problem_1.default.findByIdAndUpdate(problemId, { state: interfaces_1.ProblemState.Resuelto }, { new: true }).lean();
        const solution = new solution_1.default(req.body);
        yield solution.save();
        return res.json(solution);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createSolution = createSolution;
const updateSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const solution = yield solution_1.default.findById(id).lean();
        if (!solution) {
            return res.status(404).json({ message: 'El solutiona no existe' });
        }
        const solutionUpdated = yield solution_1.default.findByIdAndUpdate(id, req.body, { new: true }).lean();
        return res.json(solutionUpdated);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateSolution = updateSolution;
const deleteSolution = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const solution = yield solution_1.default.findById(id).lean();
        if (!solution) {
            return res.status(404).json({ message: 'El solutiona no existe' });
        }
        yield solution_1.default.findByIdAndDelete(id).lean();
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteSolution = deleteSolution;
