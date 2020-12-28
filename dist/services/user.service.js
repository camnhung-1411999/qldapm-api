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
const auth_model_1 = require("../model/auth.model");
const user_model_1 = __importDefault(require("../model/user.model"));
const auth_1 = __importDefault(require("../utils/auth"));
class UserService {
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_model_1.default.find();
            return users;
        });
    }
    find(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                email: input,
            });
            if (!user) {
                const err = new Error();
                err.message = "User not found";
                err.name = "Error";
                throw err;
            }
            return user;
        });
    }
    detail(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield user_model_1.default.findOne({
                email: input.email,
            });
            if (!findUser) {
                const err = new Error();
                err.message = "NOT_FOUND";
                err.name = "Error";
                throw err;
            }
            let token;
            if (input.password) {
                const isMatch = yield findUser.comparePassword(input.password);
                if (!isMatch) {
                    const err = new Error();
                    err.message = "NOT_MATCH";
                    err.name = "Error";
                    throw err;
                }
            }
            // Create Token
            const newAccessToken = yield auth_1.default.generateAccessToken(input);
            const newRefreshToken = yield auth_1.default.generateRefreshToken(input);
            // let kind = find.getService();
            const authToken = {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                kind: "",
            };
            return auth_model_1.AuthTokenCollection.findOne({ user: findUser.id }).then((existingUser) => __awaiter(this, void 0, void 0, function* () {
                if (existingUser) {
                    token = yield auth_model_1.AuthTokenCollection.findOneAndUpdate({ user: findUser.id }, authToken);
                }
                else {
                    token = yield auth_model_1.AuthTokenCollection.create(Object.assign({ user: findUser.id }, authToken));
                }
                return {
                    email: findUser.email,
                    name: findUser.name,
                    accessToken: token.accessToken,
                    refreshToken: token.refreshToken,
                };
            }));
        });
    }
    create(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield user_model_1.default.findOne({
                email: input.email,
            }).then((user) => {
                if (user) {
                    const err = new Error();
                    err.message = "USER_EXIST";
                    err.name = "Error";
                    throw err;
                }
            });
            const userCreate = new user_model_1.default({
                email: input.email,
                password: input.password,
                name: input.name,
                company: input.company,
                address: input.address,
                phone: input.phone,
                signature: input.signature,
                type: input.type,
            });
            yield userCreate.save();
            return userCreate;
        });
    }
    update(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({
                email: input.email,
            });
            if (!user) {
                const error = new Error();
                error.message = " USER_NOT_Found";
                throw error;
            }
            if (input.oldPassword) {
                const isMatch = yield user.comparePassword(input.oldPassword);
                if (!isMatch) {
                    const err = new Error();
                    err.message = "NOT_MATCH";
                    err.name = "Error";
                    throw err;
                }
            }
            if (input.password) {
                user.password = input.password;
            }
            if (input.name) {
                user.name = input.name;
            }
            user.company = input.company ? input.company : user.company;
            user.signature = input.signature ? input.signature : user.signature;
            user.address = input.address ? input.address : user.address;
            user.phone = input.phone ? input.phone : user.phone;
            user.image = input.image ? input.image : user.image;
            user.type = input.type ? input.type : user.type;
            yield user.save();
            return user;
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map