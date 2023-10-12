"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemState = exports.ProblemType = void 0;
var ProblemType;
(function (ProblemType) {
    ProblemType["Software"] = "Software";
    ProblemType["Hardware"] = "Hardware";
    ProblemType["Otros"] = "Otros";
})(ProblemType || (exports.ProblemType = ProblemType = {}));
var ProblemState;
(function (ProblemState) {
    ProblemState["Pendiente"] = "Pendiente";
    ProblemState["En proceso"] = "En proceso";
    ProblemState["Resuelto"] = "Resuelto";
})(ProblemState || (exports.ProblemState = ProblemState = {}));
