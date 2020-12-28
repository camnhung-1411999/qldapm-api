"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthTokenCollection = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
const authTokenSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: typeof user_model_1.default, required: true },
    accessToken: { type: String },
    refreshToken: { type: String },
    kind: { type: String },
}, { timestamps: true });
exports.AuthTokenCollection = mongoose_1.default.model('authTokens', authTokenSchema);
//# sourceMappingURL=auth.model.js.map