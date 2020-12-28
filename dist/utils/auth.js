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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const jwtConfig = {
    accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET || '2155B3A7378B76C15A33932859D6F',
    refreshTokenSecret: process.env.JWT_REFRESHTOKEN_SECRET || '11EC248BF9C2CF4AEAC958724EB4B',
    issuer: process.env.JWT_ISSUER || '6AC3E9A78E316',
    audience: process.env.JWT_AUDIENCE || 'B55EF41518AED',
};
const authUtils = {
    generateAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ user: user.email || '' }, jwtConfig.accessTokenSecret, {
                subject: user.id || '',
                audience: jwtConfig.audience,
                issuer: jwtConfig.issuer,
                expiresIn: '2d',
            });
        });
    },
    generateRefreshToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({ user: user.email || '' }, jwtConfig.refreshTokenSecret, {
                subject: user.id || '',
                audience: jwtConfig.audience,
                issuer: jwtConfig.issuer,
                expiresIn: '5d',
            });
        });
    },
    verifyJWT(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.verify(token, jwtConfig.accessTokenSecret, (err, user) => {
                if (err) {
                    throw err;
                }
                return user;
            });
        });
    }
};
exports.default = authUtils;
//# sourceMappingURL=auth.js.map