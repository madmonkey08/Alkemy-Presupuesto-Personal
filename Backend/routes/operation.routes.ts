import { Router } from "express";
import { check } from "express-validator/check";
import { createOperation, getOperation, getOperations, updateOperation, deleteOperation } from '../controllers/operation.controller';
import validateData from "../middlewares/validate-data";
import { validateAmount } from '../middlewares/database-validators';

const router = Router();

const middlewares = [
    check("type", "Please enter the operation type.").not().isEmpty(),
    check("concept", "Please enter the concept.").not().isEmpty(),
    check("amount", "Please enter the amount.").not().isEmpty(),
    check("amount", "The amount must be a numeric value.").isNumeric(),
    check("amount").custom(validateAmount),
    check("user", "The user is needed to create an operation, please login.").not().isEmpty(),
    check("category", "Select a category of the list.").not().isEmpty(),
    validateData
]

router.get("/:id", getOperations);
router.get("/get/:id", getOperation);

router.post("/", middlewares, createOperation);

router.put("/", middlewares, updateOperation);

router.delete("/", deleteOperation);

export default router;