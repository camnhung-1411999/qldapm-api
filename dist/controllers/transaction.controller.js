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
const transaction_service_1 = __importDefault(require("../services/transaction.service"));
const mailer_middlerware_1 = __importDefault(require("../middleware/mailer.middlerware"));
const user_auth_1 = require("../middleware/user.auth");
class TransactionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_auth_1.User(req, res);
            const results = yield transaction_service_1.default.list(user);
            res.json(results);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            transaction_service_1.default.find(req.params.id)
                .then((result) => {
                res.json(result);
            })
                .catch((error) => {
                res.status(404).json({
                    name: "ERROR",
                    message: error.message,
                });
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = yield user_auth_1.User(req, res);
            const input = Object.assign(Object.assign({}, req.body), { sender });
            transaction_service_1.default.create(input)
                .then((result) => __awaiter(this, void 0, void 0, function* () {
                const url = "../templates/notification";
                const data = {
                    fromEmail: sender,
                    email: result.receiver,
                    url: process.env.URL_FE,
                };
                yield mailer_middlerware_1.default.send(data, url)
                    .then(() => {
                    res.json(result);
                })
                    .catch((error) => {
                    res.status(500).json({
                        message: error.message,
                    });
                });
            }))
                .catch((err) => {
                res.status(404).json({
                    message: err.message,
                });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = Object.assign({ id: req.params.id }, req.body);
            transaction_service_1.default.update(input)
                .then((result) => {
                res.json(result);
            })
                .catch((error) => {
                res.status(404).json({
                    name: "ERROR",
                    message: error.message,
                });
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield transaction_service_1.default.delete(req.params.id);
            res.json(result);
        });
    }
}
exports.default = new TransactionController();
//# sourceMappingURL=transaction.controller.js.map