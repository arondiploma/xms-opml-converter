import { Router } from "express";
import { default as multer } from "multer";
import { xlsParser } from "../helpers";
import { result, row } from "../helpers/xls-parser";
import path from "path";
import xmlbuilder from "xmlbuilder";
import fs from "fs";

const router = Router();
const upload = multer({ dest: path.resolve('uploads/') })

router.post('/convert', upload.single("file"), async (req, res, next) => {

  const file: Express.Multer.File = req.file;
  const filePath: string = path.resolve(file.path);
  const xlsJson: result = await xlsParser(filePath);

  //fs.unlink(filePath, () => { });

  if (xlsJson.success && xlsJson.rows) {
    const xml = xmlbuilder.create('xml', { version: "1.0" });
    const opml = xml.ele("opml", { version: "2.0" });
    const head = opml.ele("head");
    const body = opml.ele("body");
    const sheet = "www.clippings.io";

    head.ele("ownerEmail", {}, "owner@email.com");

    xlsJson.rows[sheet].forEach((row: row, index: number) => {
      if (index === 0) return;
      body.ele("outline", {
        text: row.Content.trim(),
        _note: row.Notes ? row.Notes.replace("Notes: 1)", "").trim() : "-"
      });
    });
    opml.end();

    res.set('Content-Type', 'text/json');
    res.send({
      fileName: file.originalname,
      opml: opml.toString()
    });
  } else {
    res.status(400);
    res.send({ message: "Invalid XLS file." });
  }

});

export default router;
