"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ManualSchema = new mongoose_1.Schema({
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
    description_solution: {
        type: String,
        required: [true, 'Los pasos de solucion son obligatorio'],
    },
    solution: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Solution',
        required: [true, 'La solucion es obligatoria'],
    },
}, {
    timestamps: true,
});
const Manual = mongoose_1.models.Manual || (0, mongoose_1.model)('Manual', ManualSchema);
exports.default = Manual;
