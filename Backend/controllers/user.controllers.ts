import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

export const getUsers = async (req: Request, res: Response) => {

    try {

        const users = await User.findAll();

        res.json({
            ok: true,
            users
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer"
        });
    }
}

export const getAmount = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const search = await User.findOne({ where: { email: id } });

        if (!search) {
            return res.json({
                ok: false,
                msg: "An error has ocurred while getting the amount."
            });
        }

        res.json({
            ok: true,
            amount: search.get("amount")
        });


    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer."
        });
    }
}

export const createUser = async (req: Request, res: Response) => {

    try {

        let { email, password, repeatPass } = req.body;

        let user = await User.findOne({ where: { email } });

        if (user) {
            return res.json({
                ok: false,
                msg: "There is already a user with that email."
            });
        }

        if (!(password === repeatPass)) {
            return res.json({
                ok: false,
                msg: "Passwords don't match!"
            });
        }

        const salt = bcrypt.genSaltSync();

        password = bcrypt.hashSync(password, salt);

        user = User.build({ id: null, email, password, amount: 0 });

        const create = await user.save();

        if (!create) {
            return res.json({
                ok: false,
                msg: "An error has occurred while registering the user."
            });
        }

        res.json({
            ok: true,
            msg: "User created succesfully"
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer"
        })
    }

}