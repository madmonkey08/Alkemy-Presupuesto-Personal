"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOperation = exports.updateOperation = exports.createOperation = exports.getOperations = exports.getOperation = void 0;
const operation_1 = __importDefault(require("../models/operation"));
const user_1 = __importDefault(require("../models/user"));
const getOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const operation = yield operation_1.default.findOne({ where: { id } });
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
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
});
exports.getOperation = getOperation;
const getOperations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield user_1.default.findOne({ where: { email: id } });
        if (!user) {
            return res.json({
                ok: false,
                msg: "A logged user is required to get the operations."
            });
        }
        const id_user = user.get("id");
        const operations = (yield operation_1.default.findAll({ where: { id_user } })).reverse();
        res.json({
            ok: true,
            operations
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
});
exports.getOperations = getOperations;
const createOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const userResult = yield user_1.default.findOne({ where: { email: body.user } });
        if (!userResult) {
            return res.json({
                ok: false,
                msg: "A logged user is required to create an operation."
            });
        }
        const id_user = userResult.get("id");
        const amount = parseInt(userResult.get("amount"));
        const newAmount = parseInt(body.amount);
        body.id_user = id_user;
        if (body.type === "Income") {
            const increment = yield user_1.default.update({ amount: amount + newAmount }, { where: { id: id_user } });
            if (!increment) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while incrementing the income."
                });
            }
        }
        else if (body.type === "Outgoing") {
            const decrement = yield user_1.default.update({ amount: amount - newAmount }, { where: { id: id_user } });
            if (!decrement) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while substracting the outgoing."
                });
            }
        }
        else {
            return res.json({
                ok: false,
                msg: "Please enter a valid operation (Income or Outgoing)."
            });
        }
        const operation = operation_1.default.build(body);
        const creation = yield operation.save();
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
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
});
exports.createOperation = createOperation;
const updateOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { user } = body;
        const userResult = yield user_1.default.findOne({ where: { id: user } });
        if (!userResult) {
            return res.json({
                ok: false,
                msg: "A logged user is required to create an operation."
            });
        }
        const oldOperation = yield operation_1.default.findByPk(body.id);
        if (!oldOperation) {
            return res.json({
                ok: false,
                msg: "There is none operation with that id."
            });
        }
        const amount = parseInt(userResult.get("amount"));
        const newAmount = parseInt(body.amount);
        const oldAmount = parseInt(oldOperation.get("amount"));
        if (body.type === "Income") {
            const increment = yield user_1.default.update({ amount: (amount - oldAmount) + newAmount }, { where: { id: user } });
            if (!increment) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while incrementing the income."
                });
            }
        }
        else if (body.type === "Outgoing") {
            const decrement = yield user_1.default.update({ amount: (amount + oldAmount) - newAmount }, { where: { id: user } });
            if (!decrement) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while substracting the outgoing."
                });
            }
        }
        else {
            return res.json({
                ok: false,
                msg: "Please enter a valid operation (Income or Outgoing)."
            });
        }
        const { type } = body, rest = __rest(body, ["type"]);
        const update = yield operation_1.default.update(rest, { where: { id: body.id } });
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
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
});
exports.updateOperation = updateOperation;
const deleteOperation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const { user } = body;
        const userResult = yield user_1.default.findOne({ where: { id: user } });
        if (!userResult) {
            return res.json({
                ok: false,
                msg: "A logged user is required to create an operation."
            });
        }
        const userAmount = parseInt(userResult.get("amount"));
        if (body.type === "Income") {
            const increment = yield user_1.default.update({ amount: userAmount - body.amount }, { where: { id: user } });
            if (!increment) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while incrementing the income."
                });
            }
        }
        else if (body.type === "Outgoing") {
            const decrement = yield user_1.default.update({ amount: userAmount + body.amount }, { where: { id: user } });
            if (!decrement) {
                return res.json({
                    ok: false,
                    msg: "An error has ocurred while substracting the outgoing."
                });
            }
        }
        else {
            return res.json({
                ok: false,
                msg: "Please enter a valid operation (Income or Outgoing)."
            });
        }
        const result = yield operation_1.default.destroy({ where: { id: body.id } });
        if (!result) {
            return res.json({
                ok: false,
                msg: "An error has occurred while deleting the operation."
            });
        }
        res.json({
            ok: true,
            msg: "Operation deleted successfully!"
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, contact the developer."
        });
    }
});
exports.deleteOperation = deleteOperation;
//# sourceMappingURL=operation.controller.js.map