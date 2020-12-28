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
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true, index: true },
    password: String,
    company: String,
    address: String,
    phone: String,
    name: String,
    image: String,
    signature: String,
    type: String,
}, { timestamps: true });
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, (Err, hash) => {
            if (Err) {
                return next(Err);
            }
            user.password = hash;
            next();
        });
    });
});
const comparePassword = function (candidatePassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield bcrypt_1.default.compare(candidatePassword, this.password);
        return result;
    });
};
userSchema.methods.comparePassword = comparePassword;
const UserCollection = mongoose_1.default.model('User', userSchema);
exports.default = UserCollection;
//# sourceMappingURL=user.model.js.map