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
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("../routes/user.routes"));
const auth_routes_1 = __importDefault(require("../routes/auth.routes"));
const operation_routes_1 = __importDefault(require("../routes/operation.routes"));
const cors_1 = __importDefault(require("cors"));
const dbconfig_1 = __importDefault(require("../database/dbconfig"));
class Server {
    constructor() {
        this.paths = {
            users: "/api/users",
            auth: "/api/auth",
            operations: "/api/operations"
        };
        this.app = (0, express_1.default)();
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
        this.app.use((0, cors_1.default)());
        // Body lecture
        this.app.use(express_1.default.json());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbconfig_1.default.authenticate();
                console.log("Database online!");
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    routes() {
        this.app.use(this.paths.users, user_routes_1.default);
        this.app.use(this.paths.auth, auth_routes_1.default);
        this.app.use(this.paths.operations, operation_routes_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server running on port", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map