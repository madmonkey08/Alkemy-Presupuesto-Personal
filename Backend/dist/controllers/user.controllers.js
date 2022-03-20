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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAmount = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll();
        res.json({
            ok: true,
            users
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer"
        });
    }
});
exports.getUsers = getUsers;
const getAmount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const search = yield user_1.default.findOne({ where: { email: id } });
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
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer."
        });
    }
});
exports.getAmount = getAmount;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, password, repeatPass } = req.body;
        let user = yield user_1.default.findOne({ where: { email } });
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
        const salt = bcrypt_1.default.genSaltSync();
        password = bcrypt_1.default.hashSync(password, salt);
        user = user_1.default.build({ id: null, email, password, amount: 0 });
        const create = yield user.save();
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
    }
    catch (err) {
        console.log(err);
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer"
        });
    }
});
exports.createUser = createUser;
//# sourceMappingURL=user.controllers.js.map