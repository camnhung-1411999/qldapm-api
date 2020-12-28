"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
const fileSchema = new mongoose_1.default.Schema({
    email: { type: String, ref: user_model_1.default },
    path: { type: String },
    type: { type: String },
    name: { type: String },
    size: Number,
}, { timestamps: true });
const FileCollection = mongoose_1.default.model('file', fileSchema);
exports.default = FileCollection;
//# sourceMappingURL=file.model.js.map