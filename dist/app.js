"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routers_1 = __importDefault(require("./routers"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(body_parser_1.default.json({ limit: '50MB' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cors_1.default({
    origin: '*',
    credentials: true,
}));
app.use('/', routers_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map