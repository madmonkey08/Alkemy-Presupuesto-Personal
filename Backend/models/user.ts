import { DataTypes } from "sequelize";
import db from "../database/dbconfig";

const User = db.define("User", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
});

export default User;