"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interfaces_1 = require("../interfaces");
const SolutionSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'El titulo es obligatorio'],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'El descripcion es obligatorio'],
    },
    type: {
        type: String,
        enum: interfaces_1.SolutionType,
        required: [true, 'El tipo es obligatorio'],
    },
    problem: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Problem',
        required: [true, 'El problema es obligatorio'],
    },
    manual: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Manual',
    },
}, {
    timestamps: true,
});
const Solution = mongoose_1.models.Solution || (0, mongoose_1.model)('Solution', SolutionSchema);
exports.default = Solution;
