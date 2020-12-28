"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
const paymentSchema = new mongoose_1.default.Schema({
    email: { type: String, ref: user_model_1.default },
    amount: String,
}, { timestamps: true });
const PaymentCollection = mongoose_1.default.model('payment', paymentSchema);
exports.default = PaymentCollection;
//# sourceMappingURL=payment.model.js.map