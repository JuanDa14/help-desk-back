"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interfaces_1 = require("../interfaces");
const ProblemSchema = new mongoose_1.Schema({
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
        enum: interfaces_1.ProblemType,
        required: [true, 'El tipo es obligatorio'],
    },
    state: {
        type: String,
        enum: interfaces_1.ProblemState,
        required: [true, 'El estado es obligatorio'],
        default: interfaces_1.ProblemState.Pendiente,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El usuario es obligatorio'],
    },
}, {
    timestamps: true,
});
const Problem = mongoose_1.models.Problem || (0, mongoose_1.model)('Problem', ProblemSchema);
exports.default = Problem;
