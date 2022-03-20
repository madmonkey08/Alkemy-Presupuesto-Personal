"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbconfig_1 = __importDefault(require("../database/dbconfig"));
const Operation = dbconfig_1.default.define("Operation", {
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        primaryKey: true
    },
    id_user: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    concept: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false
    }
});
exports.default = Operation;
//# sourceMappingURL=operation.js.map