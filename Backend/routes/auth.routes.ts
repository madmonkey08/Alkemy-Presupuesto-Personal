import { Router } from "express";
import { check } from "express-validator/check";
import { auth } from "../controllers/auth.controller";
import validateData from '../middlewares/validate-data';

const router = Router();

const middlewares = [
    check("email", "Enter your email, please.").not().isEmpty(),
    check("password", "Enter your password, please.").not().isEmpty(),
    validateData
];

router.post("/", middlewares, auth);

export default router;