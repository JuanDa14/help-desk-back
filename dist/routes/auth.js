"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/login', middlewares_1.loginValidator, controllers_1.loginUser);
router.get('/refresh-token', middlewares_1.verifyJWT, controllers_1.refreshTokenUser);
exports.default = router;
