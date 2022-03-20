import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const validateData = (req: Request, res: Response, next: NextFunction) => {

    try {

        const errors: any = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                ok: false,
                msg: errors.errors[0].msg
            });
        }

        next();
    } catch (err) {
        return res.json({
            ok: false,
            msg: "Internal error, contact the developer, please."
        });
    }
}

export default validateData;