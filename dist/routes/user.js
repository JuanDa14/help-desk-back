"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get('/', controllers_1.getUsers);
router.get('/:id', middlewares_1.getUserValidator, controllers_1.getUser);
router.post('/', middlewares_1.createUserValidator, controllers_1.createUser);
router.patch('/:id', middlewares_1.getUserValidator, controllers_1.updateUser);
router.delete('/:id', middlewares_1.getUserValidator, controllers_1.deleteUser);
exports.default = router;