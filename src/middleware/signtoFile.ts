import superagent from "superagent";
import {
  Document,
  Media,
  Packer,
  Paragraph,
} from "docx";
import path from "path";
const mammoth = require("mammoth");
global.atob = require("atob");
const fs = require("fs");

export const signToFile = async (file: any, user: any) => {
    const response = await superagent
      .get(
        file.path,
      )
      .parse(superagent.parse.image)
      .buffer();

    const buffer = response.body;

    const text = (await mammoth.extractRawText({ buffer })).value;
    const lines = text.split('\n');

    let encoded = user.signature.replace(/^data:(.*,)?/, '');
    if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
    }
    const doc = new Document();
    // let blob = await fetch(url).then(r => r.blob());
    const image1 = Media.addImage(
      doc,

      Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))
    );
    const myarr = lines.map((line: any) => (new Paragraph(line)))
    doc.addSection({
      children: [...myarr, new Paragraph("Your signature"), new Paragraph(image1), new Paragraph(`${user.name}`)],
    });

    // Packer.toBlob(doc).then((blob) => {
    //   saveAs(blob, 'nhung');
    //   console.log("Document created successfully");
    // });
    await Packer.toBuffer(doc).then((ibuffer) => {
      fs.writeFileSync(path.join(__dirname, '../../uploads/sign.docx'), ibuffer);
    });
    return 'uploads/sign.docx';
}