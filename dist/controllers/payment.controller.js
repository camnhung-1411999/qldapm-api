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
const payment_service_1 = __importDefault(require("../services/payment.service"));
const user_auth_1 = require("../middleware/user.auth");
class PaymentController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield user_auth_1.User(req, res);
            const results = yield payment_service_1.default.list(email);
            res.json(results);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            payment_service_1.default.find(req.params.id).then((result) => {
                res.json(result);
            }).catch((error) => {
                res.status(404).json({
                    name: 'ERROR',
                    message: error.message,
                });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield user_auth_1.User(req, res);
            const input = Object.assign(Object.assign({}, req.body), { email });
            payment_service_1.default.create(input).then((result) => {
                res.json(result);
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = Object.assign({ id: req.params.id }, req.body);
            payment_service_1.default.update(input).then((result) => {
                res.json(result);
            }).catch((error) => {
                res.status(404).json({
                    name: 'ERROR',
                    message: error.message,
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield payment_service_1.default.delete(req.params.id);
            res.json(result);
        });
    }
}
exports.default = new PaymentController();
//# sourceMappingURL=payment.controller.js.map