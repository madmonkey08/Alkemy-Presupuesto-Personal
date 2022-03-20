"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("express-validator/check");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_data_1 = __importDefault(require("../middlewares/validate-data"));
const router = (0, express_1.Router)();
const middlewares = [
    (0, check_1.check)("email", "Enter your email, please.").not().isEmpty(),
    (0, check_1.check)("password", "Enter your password, please.").not().isEmpty(),
    validate_data_1.default
];
router.post("/", middlewares, auth_controller_1.auth);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map