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
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const helpers_1 = require("../helpers");
const path_1 = __importDefault(require("path"));
const xmlbuilder_1 = __importDefault(require("xmlbuilder"));
const router = express_1.Router();
const upload = multer_1.default({ dest: path_1.default.resolve('uploads/') });
router.post('/convert', upload.single("file"), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const filePath = path_1.default.resolve(file.path);
    const xlsJson = yield helpers_1.xlsParser(filePath);
    //fs.unlink(filePath, () => { });
    if (xlsJson.success && xlsJson.rows) {
        const xml = xmlbuilder_1.default.create('xml', { version: "1.0" });
        const opml = xml.ele("opml", { version: "2.0" });
        const head = opml.ele("head");
        const body = opml.ele("body");
        const sheet = "www.clippings.io";
        head.ele("ownerEmail", {}, "owner@email.com");
        xlsJson.rows[sheet].forEach((row, index) => {
            if (index === 0)
                return;
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
    }
    else {
        res.status(400);
        res.send({ message: "Invalid XLS file." });
    }
}));
exports.default = router;
