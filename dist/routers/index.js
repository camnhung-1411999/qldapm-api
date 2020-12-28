"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_routes_1 = __importDefault(require("./user.routes"));
const file_routes_1 = __importDefault(require("./file.routes"));
const transaction_routes_1 = __importDefault(require("./transaction.routes"));
const payment_routes_1 = __importDefault(require("./payment.routes"));
const express = require("express");
const router = express.Router();
router.use('/users', user_routes_1.default);
router.use('/files', file_routes_1.default);
router.use('/transactions', transaction_routes_1.default);
router.use('/payments', payment_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map