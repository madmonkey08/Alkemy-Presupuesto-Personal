import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import { generateJWT } from "../helpers/generateJWT";

export const auth = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body;

        // Search an user with that email
        const user = await User.findOne({ where: { email } });

        // Verify if the user exists in db
        if (!user) {
            return res.json({
                ok: false,
                msg: "There is not registered user with that email"
            });
        }

        // Compare both passwords
        const validPassword = bcrypt.compareSync(password, user.get("password") as string);

        if (!validPassword) {
            return res.json({
                ok: false,
                msg: "Incorrect password, please check your information."
            });
        }

        // Generate JWT
        const token: any = await generateJWT(user.get("email") as string);

        res.json({
            ok: true,
            user,
            token
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer"
        });
    }

}