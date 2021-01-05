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
exports.signToFile = void 0;
const superagent_1 = __importDefault(require("superagent"));
const docx_1 = require("docx");
const path_1 = __importDefault(require("path"));
const mammoth = require("mammoth");
global.atob = require("atob");
const fs = require("fs");
exports.signToFile = (file, user) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield superagent_1.default
        .get(file.path)
        .parse(superagent_1.default.parse.image)
        .buffer();
    const buffer = response.body;
    const text = (yield mammoth.extractRawText({ buffer })).value;
    const lines = text.split('\n');
    let encoded = user.signature.replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
    }
    const doc = new docx_1.Document();
    // let blob = await fetch(url).then(r => r.blob());
    const image1 = docx_1.Media.addImage(doc, Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0)));
    const myarr = lines.map((line) => (new docx_1.Paragraph(line)));
    doc.addSection({
        children: [...myarr, new docx_1.Paragraph("Your signature"), new docx_1.Paragraph(image1), new docx_1.Paragraph(`${user.name}`)],
    });
    // Packer.toBlob(doc).then((blob) => {
    //   saveAs(blob, 'nhung');
    //   console.log("Document created successfully");
    // });
    yield docx_1.Packer.toBuffer(doc).then((ibuffer) => {
        fs.writeFileSync(path_1.default.join(__dirname, '../../uploads/sign.docx'), ibuffer);
    });
    return 'uploads/sign.docx';
});
//# sourceMappingURL=signtoFile.js.map