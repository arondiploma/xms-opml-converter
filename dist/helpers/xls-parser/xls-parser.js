"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const xlsx_1 = __importDefault(require("xlsx"));
const fs_1 = __importDefault(require("fs"));
const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
exports.default = (filePath) => {
    return new Promise((resolve, reject) => {
        let result = { success: true };
        try {
            fs_1.default.readFile(filePath, {
                encoding: "binary"
            }, (err, data) => {
                if (err) {
                    result.error = err;
                    reject(result);
                }
                else {
                    result.rows = onLoadEvent(data);
                    resolve(result);
                }
            });
        }
        catch (error) {
            result.error = error;
            reject(result);
        }
    });
};
const onLoadEvent = (binary) => {
    const parsedXls = {};
    var workbook = xlsx_1.default.read(binary, {
        type: 'binary'
    });
    const sheetNames = getSheetNames(workbook);
    sheetNames.forEach((name) => {
        const sheet = workbook.Sheets[name];
        const desiredCells = getDesiredCells(sheet);
        const lastColRow = getLastRowCol(desiredCells);
        const columnsAndHeaders = getColumnsAndHeaders(sheet, desiredCells);
        parsedXls[name] = getData(lastColRow, columnsAndHeaders.excelColumns, columnsAndHeaders.headers, sheet);
    });
    return parsedXls;
};
const getData = (lastColRow, columns, headers, sheet) => {
    const data = [];
    for (let R = 0; R <= lastColRow; R++) {
        const element = {};
        headers.forEach((header, index) => {
            const cellValue = getValue(sheet, columns[index], R);
            if (cellValue) {
                element[header] = cellValue.w ? cellValue.w : cellValue.v;
            }
        });
        if (Object.keys(element).length > 0) {
            data.push(element);
        }
    }
    return data;
};
const getValue = (sheet, column, R) => sheet[`${column}${R}`];
const getSheetNames = (workbook) => workbook.SheetNames;
const getDesiredCells = (worksheet) => worksheet['!ref'];
const getLastRowCol = (cells) => {
    const rows = cells.split(':');
    const lastColRow = rows.length > 1 ? rows[1] : rows[0];
    const lastColLetter = extractLetter(lastColRow);
    const array = lastColRow.split(lastColLetter);
    return Number(array[1]);
};
const getColumnsAndHeaders = (worksheet, desired_cells) => {
    const cells = desired_cells.split(':');
    const lastCell = cells.length > 1 ? cells[1] : cells[0];
    const lastColLetter = extractLetter(lastCell);
    let iterator = 0;
    let accumulator = '';
    let accumulatorIterator = 0;
    const headers = [];
    const excelColumns = [];
    while (true) {
        const currentCell = `${accumulator}${abc[iterator++]}`;
        const cellHeader = worksheet[currentCell + 1];
        if (cellHeader) {
            headers.push(cellHeader.v);
            excelColumns.push(currentCell);
        }
        if (lastColLetter == currentCell) {
            return { headers: headers, excelColumns: excelColumns };
        }
        if (iterator >= abc.length) {
            const test = abc[accumulatorIterator++];
            iterator = 0;
            accumulator = test;
        }
    }
};
const extractLetter = (str) => {
    const array = str.split(/[0-9]+/);
    return array[0];
};
