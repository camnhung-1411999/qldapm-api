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
const email_templates_1 = __importDefault(require("email-templates"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mailer {
    send(data, url) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = yield nodemailer_1.default.createTransport({
                pool: true,
                service: "Gmail",
                host: "smtp.gmail.com",
                auth: {
                    user: process.env.HOST_MAIL || "camnhung111777@gmail.com",
                    pass: process.env.PASS_MAIL || "swxajgfvfvzvtesu",
                },
            });
            const email = new email_templates_1.default({
                message: {
                    from: process.env.HOST_MAIL || "camnhung111777@gmail.com",
                },
                send: true,
                transport: transporter,
            });
            try {
                const mail2 = yield email.send({
                    template: path_1.default.join(__dirname, url),
                    message: {
                        to: data.email,
                    },
                    locals: {
                        data,
                    },
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = new Mailer();
//# sourceMappingURL=mailer.middlerware.js.map