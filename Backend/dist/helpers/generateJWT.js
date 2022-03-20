"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (uid = '') => {
    return new Promise((res) => {
        const payload = { uid };
        const privateKey = process.env.SECRETORPRIVATEKEY;
        jsonwebtoken_1.default.sign(payload, privateKey, {
            expiresIn: '12h'
        }, (err, token) => {
            if (err) {
                res('An error has occured while generating token');
            }
            else {
                res(token);
            }
        });
    });
};
exports.generateJWT = generateJWT;
//# sourceMappingURL=generateJWT.js.map