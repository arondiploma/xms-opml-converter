import sheetJs from "xlsx";
import fs from "fs";
const abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export type row = {
    [key: string]: any;
};

type rows = {
    [key: string]: row[]
};

export type result = {
    success: boolean,
    rows?: rows
    error?: any
};

type resolve = (value?: result) => void
type reject = (reason?: result) => void

export default (filePath: string) => {
    return new Promise((resolve: resolve, reject: reject) => {
        let result: result = { success: true };
        try {
            fs.readFile(filePath, {
                encoding: "binary"
            }, (err, data) => {
                if (err) {
                    result.error = err;
                    reject(result);
                } else {
                    result.rows = onLoadEvent(data)
                    resolve(result);
                }
            });
        } catch (error) {
            result.error = error;
            reject(result);
        }
    });
};

const onLoadEvent = (binary: string): rows => {
    const parsedXls: rows = {};
    var workbook = sheetJs.read(binary, {
        type: 'binary'
    });
    const sheetNames = getSheetNames(workbook);

    sheetNames.forEach((name: string) => {
        const sheet = workbook.Sheets[name];
        const desiredCells = getDesiredCells(sheet);
        const lastColRow = getLastRowCol(desiredCells);
        const columnsAndHeaders = getColumnsAndHeaders(sheet, desiredCells);

        parsedXls[name] = getData(lastColRow, columnsAndHeaders.excelColumns, columnsAndHeaders.headers, sheet);
    });

    return parsedXls;
}

const getData = (lastColRow: number, columns: string[], headers: string[], sheet: sheetJs.WorkSheet) => {
    const data: object[] = [];

    for (let R: number = 0; R <= lastColRow; R++) {
        const element = {};

        headers.forEach((header, index) => {
            const cellValue = getValue(sheet, columns[index], R);

            if (cellValue) {
                element[header] = cellValue.w ? cellValue.w : cellValue.v
            }
        });
        if (Object.keys(element).length > 0) {
            data.push(element);
        }
    }

    return data;
}

const getValue = (sheet: sheetJs.WorkSheet, column: string, R: number) => sheet[`${column}${R}`];

const getSheetNames = (workbook: sheetJs.WorkBook) => workbook.SheetNames;

const getDesiredCells = (worksheet: sheetJs.WorkSheet) => worksheet['!ref'];

const getLastRowCol = (cells: any) => {
    const rows = cells.split(':');
    const lastColRow = rows.length > 1 ? rows[1] : rows[0];

    const lastColLetter = extractLetter(lastColRow);
    const array = lastColRow.split(lastColLetter);

    return Number(array[1]);
}

const getColumnsAndHeaders = (worksheet: sheetJs.WorkSheet, desired_cells: any) => {
    const cells = desired_cells.split(':');
    const lastCell = cells.length > 1 ? cells[1] : cells[0];
    const lastColLetter = extractLetter(lastCell);

    let iterator = 0;
    let accumulator = '';
    let accumulatorIterator = 0;
    const headers: string[] = [];
    const excelColumns: string[] = [];

    while (true) {

        const currentCell = `${accumulator}${abc[iterator++]}`;
        const cellHeader = worksheet[currentCell + 1];

        if (cellHeader) {
            headers.push(cellHeader.v)
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
}

const extractLetter = (str: string) => {
    const array = str.split(/[0-9]+/);
    return array[0];
}