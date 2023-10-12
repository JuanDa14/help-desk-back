"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AreaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: [true, 'El nombre es obligatorio'],
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'La descripción es obligatoria'],
    },
    state: {
        type: Boolean,
        default: true,
        required: [true, 'El estado es obligatorio'],
    },
}, {
    timestamps: true,
});
const Area = mongoose_1.models.Area || (0, mongoose_1.model)('Area', AreaSchema);
exports.default = Area;
