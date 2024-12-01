"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const port = 3000;
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json()); // for parsing application/json
app.use((0, cors_1.default)());
// application routes
app.use("/api/users", user_route_1.userRoutes);
app.get("/", (req, res) => {
    res.send("University Management System Backend");
});
exports.default = app;
