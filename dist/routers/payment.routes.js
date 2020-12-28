"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const authorization_1 = require("../middleware/authorization");
const router = express.Router();
router.get('/', authorization_1.author, payment_controller_1.default.list);
router.get('/:id', authorization_1.author, payment_controller_1.default.find);
router.post('/', authorization_1.author, payment_controller_1.default.create);
router.put('/:id', authorization_1.author, payment_controller_1.default.update);
router.delete('/:id', authorization_1.author, payment_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=payment.routes.js.map