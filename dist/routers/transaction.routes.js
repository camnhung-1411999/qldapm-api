"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const transaction_controller_1 = __importDefault(require("../controllers/transaction.controller"));
const authorization_1 = require("../middleware/authorization");
const router = express.Router();
router.get('/', transaction_controller_1.default.list);
router.get('/:id', transaction_controller_1.default.find);
router.post('/', authorization_1.author, transaction_controller_1.default.create);
router.put('/:id', authorization_1.author, transaction_controller_1.default.update);
router.delete('/:id', authorization_1.author, transaction_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=transaction.routes.js.map