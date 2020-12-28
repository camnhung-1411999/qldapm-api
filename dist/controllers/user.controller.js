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
const user_service_1 = __importDefault(require("../services/user.service"));
const user_auth_1 = require("../middleware/user.auth");
const mailer_middlerware_1 = __importDefault(require("../middleware/mailer.middlerware"));
const moment_1 = __importDefault(require("moment"));
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "camnhung",
    api_key: "432754556175189",
    api_secret: "2TIXe6WJiVufXL41VhbBtYjqkgc",
});
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_service_1.default.list();
            res.json(users);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = yield user_auth_1.User(req, res);
            const user = yield user_service_1.default.find(username);
            res.json(user);
        });
    }
    sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idate = new Date();
            const username = yield user_auth_1.User(req, res);
            const data = {
                fromEmail: username,
                email: req.body.toEmail,
                title: req.body.title,
                content: req.body.content,
                url: process.env.URL_FE,
                date: moment_1.default(idate).format("DD/MM/YYYY"),
                time: moment_1.default(idate).format("HH:mm"),
            };
            const url = "../templates/message";
            yield mailer_middlerware_1.default.send(data, url)
                .then(() => {
                res.json("Sent");
            })
                .catch((err) => {
                res.status(500).json({
                    message: err.message,
                });
            });
        });
    }
    detail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const iuser = {
                email: req.body.email,
                password: req.body.password,
            };
            yield user_service_1.default.detail(iuser)
                .then((user) => {
                res.json(user);
            })
                .catch((err) => {
                if (err.message === "NOT_FOUND") {
                    res.status(404).json({
                        name: "ERROR",
                        message: err.message,
                    });
                }
                else {
                    res.status(422).json({
                        name: "ERROR",
                        message: err.message,
                    });
                }
            });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = Object.assign({}, req.body);
            yield user_service_1.default.create(input)
                .then((user) => {
                res.json(user);
            })
                .catch((err) => {
                res.status(422).json({
                    name: "ERROR",
                    message: err.message,
                });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield user_auth_1.User(req, res);
            if (req.file) {
                const pathFile = req.file.destination + req.file.originalname;
                fs.renameSync(req.file.path, pathFile);
                cloudinary.v2.uploader.upload(pathFile, { resource_type: "raw" }, (err, result) => __awaiter(this, void 0, void 0, function* () {
                    yield unlinkAsync(pathFile);
                    if (err) {
                        throw err;
                    }
                    else {
                        let iinput = {
                            image: result.url,
                            email,
                        };
                        user_service_1.default.update(iinput).then((iresult) => {
                            res.json(iresult);
                        });
                    }
                }));
            }
            const input = Object.assign(Object.assign({}, req.body), { email });
            const user = yield user_service_1.default.update(input);
            res.json(user);
        });
    }
}
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map