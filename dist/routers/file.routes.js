"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const file_controller_1 = __importDefault(require("../controllers/file.controller"));
const authorization_1 = require("../middleware/authorization");
const multer_1 = __importDefault(require("multer"));
var upload = multer_1.default({ dest: 'uploads/' });
const router = express.Router();
router.get('/', file_controller_1.default.list);
router.get('/:id', authorization_1.author, file_controller_1.default.find);
router.post('/', authorization_1.author, upload.single('file'), file_controller_1.default.create);
router.put('/:id', authorization_1.author, file_controller_1.default.update);
router.delete('/:id', authorization_1.author, file_controller_1.default.delete);
exports.default = router;
//# sourceMappingURL=file.routes.js.map