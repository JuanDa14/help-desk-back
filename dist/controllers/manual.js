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
exports.deleteManual = exports.updateManual = exports.createManual = exports.getManualsByState = exports.getManual = exports.getManuals = void 0;
const manual_1 = __importDefault(require("../models/manual"));
const user_1 = __importDefault(require("../models/user"));
const getManuals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const manuals = yield manual_1.default.find()
            .sort({ createdAt: 'desc' })
            .populate('solution', 'title')
            .lean();
        return res.json(manuals);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getManuals = getManuals;
const getManual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const manual = yield manual_1.default.findById(id).populate('solution', 'title').lean();
        return res.json(manual);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getManual = getManual;
const getManualsByState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { state } = req.params;
    try {
        const manuals = yield manual_1.default.find({ state }).lean();
        return res.json(manuals);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getManualsByState = getManualsByState;
const createManual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    try {
        const user = yield user_1.default.findById(userId).lean();
        if (!user) {
            return res.status(404).json({ message: 'El usuario no existe' });
        }
        const manual = new manual_1.default(req.body);
        yield manual.save();
        return res.json(manual);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createManual = createManual;
const updateManual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const manual = yield manual_1.default.findById(id).lean();
        if (!manual) {
            return res.status(404).json({ message: 'El manuala no existe' });
        }
        const manualUpdated = yield manual_1.default.findByIdAndUpdate(id, req.body, { new: true }).lean();
        return res.json(manualUpdated);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateManual = updateManual;
const deleteManual = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const manual = yield manual_1.default.findById(id).lean();
        if (!manual) {
            return res.status(404).json({ message: 'El manuala no existe' });
        }
        yield manual_1.default.findByIdAndDelete(id).lean();
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteManual = deleteManual;
