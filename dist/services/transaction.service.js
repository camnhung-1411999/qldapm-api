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
const transaction_model_1 = __importDefault(require("../model/transaction.model"));
const user_model_1 = __importDefault(require("../model/user.model"));
class TransactionService {
    list(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_model_1.default.find({
                receiver: data,
            }).populate('fileId').then((result) => {
                return result;
            });
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_model_1.default.findById({
                _id: id,
            }).then((transaction) => {
                if (transaction) {
                    return transaction;
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
            const user = yield user_model_1.default.findOne({
                email: input.receiver,
            });
            if (!user) {
                const err = {
                    message: 'RECEIVER_NOT_FOUND',
                    name: 'Error',
                };
                throw err;
            }
            return transaction_model_1.default.create({
                sender: input.sender,
                receiver: input.receiver,
                fileId: input.fileId,
                status: input.status,
            }).then((res) => (res));
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield transaction_model_1.default.findById(input.id);
            if (!transaction) {
                const err = {
                    message: 'NOT_FOUND',
                    name: 'Error',
                };
                throw err;
            }
            transaction.sender = input.sender ? input.sender : transaction.sender;
            transaction.receiver = input.receiver ? input.receiver : transaction.receiver;
            transaction.fileId = input.fileId ? input.fileId : transaction.fileId;
            transaction.status = input.status ? input.status : transaction.status;
            yield transaction.save();
            return transaction;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return transaction_model_1.default.findByIdAndDelete(id).then((res) => (res));
        });
    }
}
exports.default = new TransactionService();
//# sourceMappingURL=transaction.service.js.map