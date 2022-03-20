"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const check_1 = require("express-validator/check");
const operation_controller_1 = require("../controllers/operation.controller");
const validate_data_1 = __importDefault(require("../middlewares/validate-data"));
const database_validators_1 = require("../middlewares/database-validators");
const router = (0, express_1.Router)();
const middlewares = [
    (0, check_1.check)("type", "Please enter the operation type.").not().isEmpty(),
    (0, check_1.check)("concept", "Please enter the concept.").not().isEmpty(),
    (0, check_1.check)("amount", "Please enter the amount.").not().isEmpty(),
    (0, check_1.check)("amount", "The amount must be a numeric value.").isNumeric(),
    (0, check_1.check)("amount").custom(database_validators_1.validateAmount),
    (0, check_1.check)("user", "The user is needed to create an operation, please login.").not().isEmpty(),
    (0, check_1.check)("category", "Select a category of the list.").not().isEmpty(),
    validate_data_1.default
];
router.get("/:id", operation_controller_1.getOperations);
router.get("/get/:id", operation_controller_1.getOperation);
router.post("/", middlewares, operation_controller_1.createOperation);
router.put("/", middlewares, operation_controller_1.updateOperation);
router.delete("/", operation_controller_1.deleteOperation);
exports.default = router;
//# sourceMappingURL=operation.routes.js.map