"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = exports.solution = exports.role = exports.problem = exports.manual = exports.area = void 0;
var area_1 = require("./area");
Object.defineProperty(exports, "area", { enumerable: true, get: function () { return __importDefault(area_1).default; } });
__exportStar(require("./index"), exports);
var manual_1 = require("./manual");
Object.defineProperty(exports, "manual", { enumerable: true, get: function () { return __importDefault(manual_1).default; } });
var problem_1 = require("./problem");
Object.defineProperty(exports, "problem", { enumerable: true, get: function () { return __importDefault(problem_1).default; } });
var role_1 = require("./role");
Object.defineProperty(exports, "role", { enumerable: true, get: function () { return __importDefault(role_1).default; } });
var solution_1 = require("./solution");
Object.defineProperty(exports, "solution", { enumerable: true, get: function () { return __importDefault(solution_1).default; } });
var user_1 = require("./user");
Object.defineProperty(exports, "user", { enumerable: true, get: function () { return __importDefault(user_1).default; } });
