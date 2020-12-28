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
const file_model_1 = __importDefault(require("../model/file.model"));
class FileService {
    list(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.default.find({
                email,
            }).then((files) => (files));
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.default.findById(id).then((result) => {
                if (result) {
                    return result;
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
            return file_model_1.default.create({
                email: input.email,
                path: input.path,
                type: input.type,
                size: input.size,
                name: input.name,
            }).then(result => (result));
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_model_1.default.findById(input.id);
            if (!file) {
                const err = {
                    message: 'NOT_FOUND',
                    name: 'Error',
                };
                throw err;
            }
            file.name = input.name ? input.name : file.name;
            file.size = input.size ? input.size : file.size;
            yield file.save();
            return file;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return file_model_1.default.findByIdAndRemove(id).then((res) => (res));
        });
    }
}
exports.default = new FileService();
//# sourceMappingURL=file.service.js.map