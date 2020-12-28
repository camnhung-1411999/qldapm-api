"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authorization_1 = require("../middleware/authorization");
const multer_1 = __importDefault(require("multer"));
var upload = multer_1.default({ dest: 'uploads/' });
const router = express.Router();
router.get('/list', authorization_1.author, user_controller_1.default.list);
router.post('/mail', authorization_1.author, user_controller_1.default.sendMail);
router.get('/', authorization_1.author, user_controller_1.default.find);
router.post('/login', user_controller_1.default.detail);
router.post('/', user_controller_1.default.create);
router.put('/', authorization_1.author, upload.single('file'), user_controller_1.default.update);
exports.default = router;
//# sourceMappingURL=user.routes.js.map