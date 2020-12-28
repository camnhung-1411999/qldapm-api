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
const payment_model_1 = __importDefault(require("../model/payment.model"));
class PaymentService {
    list(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.find({
                email,
            }).then(res => (res));
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.findById(id).then((res) => {
                if (res) {
                    return res;
                }
                const err = {
                    message: 'NOT_FOUND',
                    name: 'Error',
                };
                throw err;
            });
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.create({
                email: input.email,
                amount: input.amount,
            }).then((res) => (res));
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield payment_model_1.default.findById(input.id);
            if (!payment) {
                const err = {
                    message: 'NOT_FOUND',
                    name: 'Error',
                };
                throw err;
            }
            payment.amount = input.amount ? input.amount : payment.amount;
            yield payment.save();
            return payment;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return payment_model_1.default.findByIdAndRemove(id).then((res) => (res));
        });
    }
}
exports.default = new PaymentService();
//# sourceMappingURL=payment.service.js.map