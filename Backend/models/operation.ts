import { DataTypes } from "sequelize";
import db from "../database/dbconfig";

const Operation = db.define("Operation", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    id_user: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    concept: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});

export default Operation;