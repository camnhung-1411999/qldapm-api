"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
require('dotenv').config();
const env = process.env.NODE_ENV || 'dev';
const logger = pino_1.default({
    safe: true,
    prettyPrint: env === 'dev',
});
exports.default = logger;
//# sourceMappingURL=log.js.map