import { Router } from "express";
import { check } from "express-validator/check";
import { createUser, getAmount, getUsers } from '../controllers/user.controllers';
import validateData from "../middlewares/validate-data";

const router = Router();

const middlewares = [
    check("email", "The email is required!").not().isEmpty(),
    check("password", "The password is required!").not().isEmpty(),
    check("password", "The password must have at least 4 characters!").isLength({ min: 4 }),
    check("repeatPass", "Repeat your password, please.").not().isEmpty(),
    validateData
];

router.get("/", getUsers);
router.get("/:id", getAmount);

router.post("/", middlewares, createUser);

export default router;