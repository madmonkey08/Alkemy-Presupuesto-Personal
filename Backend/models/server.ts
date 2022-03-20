import express, { Application } from "express";
import userRoutes from "../routes/user.routes";
import authRoutes from "../routes/auth.routes";
import operationRoutes from "../routes/operation.routes";
import cors from "cors";
import db from "../database/dbconfig";

class Server {

    private app: Application;
    private port: string;
    private paths = {
        users: "/api/users",
        auth: "/api/auth",
        operations: "/api/operations"
    }

    constructor() {

        this.app = express();
        this.port = process.env.PORT || "3001";

        // Middlewares
        this.middlewares();

        // Routes definition
        this.routes();

        // Database connection
        this.dbConnection();

    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Body lecture
        this.app.use(express.json());
    }

    async dbConnection() {
        try {

            await db.authenticate();
            console.log("Database online!");

        } catch (err: any) {
            throw new Error(err);
        }
    }

    routes() {
        this.app.use(this.paths.users, userRoutes);
        this.app.use(this.paths.auth, authRoutes);
        this.app.use(this.paths.operations, operationRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
        });
    }
}

export default Server;