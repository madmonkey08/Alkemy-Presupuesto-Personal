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
exports.auth = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateJWT_1 = require("../helpers/generateJWT");
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Search an user with that email
        const user = yield user_1.default.findOne({ where: { email } });
        // Verify if the user exists in db
        if (!user) {
            return res.json({
                ok: false,
                msg: "There is not registered user with that email"
            });
        }
        // Compare both passwords
        const validPassword = bcrypt_1.default.compareSync(password, user.get("password"));
        if (!validPassword) {
            return res.json({
                ok: false,
                msg: "Incorrect password, please check your information."
            });
        }
        // Generate JWT
        const token = yield (0, generateJWT_1.generateJWT)(user.get("email"));
        res.json({
            ok: true,
            user,
            token
        });
    }
    catch (err) {
        res.json({
            ok: false,
            msg: "Internal error, please contact the developer"
        });
    }
});
exports.auth = auth;
//# sourceMappingURL=auth.controller.js.map