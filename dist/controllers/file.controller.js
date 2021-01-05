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
const file_service_1 = __importDefault(require("../services/file.service"));
const user_service_1 = __importDefault(require("../services/user.service"));
const user_auth_1 = require("../middleware/user.auth");
const signtoFile_1 = require("../middleware/signtoFile");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
var cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "camnhung",
    api_key: "432754556175189",
    api_secret: "2TIXe6WJiVufXL41VhbBtYjqkgc",
});
class FileController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = yield user_auth_1.User(req, res);
            const results = yield file_service_1.default.list(email);
            res.json(results);
        });
    }
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            file_service_1.default.find(req.params.id)
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
            const email = yield user_auth_1.User(req, res);
            const pathFile = req.file.destination + req.file.originalname;
            fs.renameSync(req.file.path, pathFile);
            cloudinary.v2.uploader.upload(pathFile, { resource_type: "raw" }, (err, result) => __awaiter(this, void 0, void 0, function* () {
                yield unlinkAsync(pathFile);
                if (err) {
                    throw err;
                }
                else {
                    let input = {
                        size: result.bytes,
                        path: result.url,
                        type: result.format,
                        email,
                        name: req.file.originalname,
                        base: req.body.base64Url,
                    };
                    file_service_1.default.create(input).then((iresult) => {
                        res.json(iresult);
                    });
                }
            }));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield file_service_1.default.find(req.params.id);
            const email = yield user_auth_1.User(req, res);
            const user = yield user_service_1.default.find(email);
            signtoFile_1.signToFile(file, user).then((pathFile) => {
                {
                    cloudinary.v2.uploader.upload(pathFile, { resource_type: "raw" }, (err, result) => __awaiter(this, void 0, void 0, function* () {
                        yield unlinkAsync(pathFile);
                        if (err) {
                            throw err;
                        }
                        else {
                            let input = {
                                id: file._id,
                                size: result.bytes,
                                path: result.url,
                                type: result.format,
                                signed: true,
                            };
                            file_service_1.default.update(input).then((iresult) => {
                                res.json(iresult);
                            });
                        }
                    }));
                }
            });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield file_service_1.default.delete(req.params.id);
            res.json(result);
        });
    }
}
exports.default = new FileController();
//# sourceMappingURL=file.controller.js.map