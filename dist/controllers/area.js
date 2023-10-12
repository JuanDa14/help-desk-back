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
exports.deleteArea = exports.updateArea = exports.createArea = exports.getArea = exports.getAreas = void 0;
const area_1 = __importDefault(require("../models/area"));
const getAreas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areas = yield area_1.default.find().lean();
        return res.json(areas);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getAreas = getAreas;
const getArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findById(id).lean();
        return res.json(area);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.getArea = getArea;
const createArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const area = new area_1.default(req.body);
        yield area.save();
        return res.json(area);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.createArea = createArea;
const updateArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const area = yield area_1.default.findByIdAndUpdate(id, req.body, { new: true }).lean();
        return res.json(area);
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.updateArea = updateArea;
const deleteArea = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield area_1.default.findByIdAndDelete(id).lean();
        return res.json({
            ok: true,
        });
    }
    catch (error) {
        return res.json({ message: 'Error interno del servidor' });
    }
});
exports.deleteArea = deleteArea;
