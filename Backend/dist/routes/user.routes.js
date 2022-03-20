"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("express-validator/check");
const user_controllers_1 = require("../controllers/user.controllers");
const validate_data_1 = __importDefault(require("../middlewares/validate-data"));
const router = (0, express_1.Router)();
const middlewares = [
    (0, check_1.check)("email", "The email is required!").not().isEmpty(),
    (0, check_1.check)("password", "The password is required!").not().isEmpty(),
    (0, check_1.check)("password", "The password must have at least 4 characters!").isLength({ min: 4 }),
    (0, check_1.check)("repeatPass", "Repeat your password, please.").not().isEmpty(),
    validate_data_1.default
];
router.get("/", user_controllers_1.getUsers);
router.get("/:id", user_controllers_1.getAmount);
router.post("/", middlewares, user_controllers_1.createUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map