import { Request, Response } from "express";
import Operation from "../models/operation";
import User from "../models/user";

export const getOperation = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const operation = await Operation.findOne({ where: { id } });

        if (!operation) {
            return res.json({
                ok: false,
                msg: "There are not operations with that id."
            });
        }

        res.json({
            ok: true,
            operation
        });

    } catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }

}

export const getOperations = async (req: Request, res: Response) => {

    try {

        const { id } = req.params;

        const user = await User.findOne({ where: { email: id } });

        if (!user) {
            return res.json({
                ok: false,
                msg: "A logged user is required to get the operations."
            });
        }

        const id_user: any = user.get("id");

        const operations = (await Operation.findAll({ where: { id_user } })).reverse();

        res.json({
            ok: true,
            operations
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }

}

export const createOperation = async (req: Request, res: Response) => {

    try {

        const { body } = req;

        const userResult = await User.findOne({ where: { email: body.user } });

        if (!userResult) {
            return res.json({
                ok: false,
                msg: "A logged user is required to create an operation."
            });
        }

        const id_user: any = userResult.get("id");
        const amount: any = parseInt(userResult.get("amount") as string);
        const newAmount = parseInt(body.amount);

        body.id_user = id_user;

        if (body.type === "Income") {
            const increment = await User.update({ amount: amount + newAmount }, { where: { id: id_user } });

            if (!increment) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while incrementing the income."
                });
            }
        } else if (body.type === "Outgoing") {
            const decrement = await User.update({ amount: amount - newAmount }, { where: { id: id_user } });

            if (!decrement) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while substracting the outgoing."
                });
            }
        } else {
            return res.json({
                ok: false,
                msg: "Please enter a valid operation (Income or Outgoing)."
            });
        }

        const operation = Operation.build(body);

        const creation = await operation.save();

        if (!creation) {
            return res.json({
                ok: false,
                msg: "An error has occurred while creating a new operation."
            });
        }

        res.json({
            ok: true,
            operation
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
}

export const updateOperation = async (req: Request, res: Response) => {

    try {

        const { body } = req;

        const { user } = body;

        const userResult = await User.findOne({ where: { id: user } });

        if (!userResult) {
            return res.json({
                ok: false,
                msg: "A logged user is required to create an operation."
            });
        }

        const oldOperation: any = await Operation.findByPk(body.id);

        if (!oldOperation) {
            return res.json({
                ok: false,
                msg: "There is none operation with that id."
            });
        }

        const amount: any = parseInt(userResult.get("amount") as string);
        const newAmount = parseInt(body.amount);
        const oldAmount: any = parseInt(oldOperation.get("amount") as string);

        if (body.type === "Income") {
            const increment = await User.update({ amount: (amount - oldAmount) + newAmount }, { where: { id: user } });

            if (!increment) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while incrementing the income."
                });
            }
        } else if (body.type === "Outgoing") {
            const decrement = await User.update({ amount: (amount + oldAmount) - newAmount }, { where: { id: user } });

            if (!decrement) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while substracting the outgoing."
                });
            }
        } else {
            return res.json({
                ok: false,
                msg: "Please enter a valid operation (Income or Outgoing)."
            });
        }

        const { type, ...rest } = body;

        const update = await Operation.update(rest, { where: { id: body.id } });

        if (!update) {
            return res.json({
                ok: false,
                msg: "An error has occurred while creating a new operation."
            });
        }

        res.json({
            ok: true,
            update
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
}

export const deleteOperation = async (req: Request, res: Response) => {

    try {

        const { body } = req;

        const { user } = body;

        const userResult = await User.findOne({ where: { id: user } });

        if (!userResult) {
            return res.json({
                ok: false,
                msg: "A logged user is required to create an operation."
            });
        }

        const userAmount: any = parseInt(userResult.get("amount") as string);

        if (body.type === "Income") {
            const increment = await User.update({ amount: userAmount - body.amount }, { where: { id: user } });

            if (!increment) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while incrementing the income."
                });
            }
        } else if (body.type === "Outgoing") {
            const decrement = await User.update({ amount: userAmount + body.amount }, { where: { id: user } });

            if (!decrement) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while substracting the outgoing."
                });
            }
        } else {
            return res.json({
                ok: false,
                msg: "Please enter a valid operation (Income or Outgoing)."
            });
        }

        const result = await Operation.destroy({ where: { id: body.id } });

        if (!result) {
            return res.json({
                ok: false,
                msg: "An error has occurred while deleting the operation."
            })
        }

        res.json({
            ok: true,
            msg: "Operation deleted successfully!"
        });

    } catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }

}