const XLSX = require('xlsx');
const fs = require('fs');

const jsonContent = fs.readFileSync('data/data.json', 'utf8');
const dataArray = JSON.parse(jsonContent);

const sheet = XLSX.utils.json_to_sheet(dataArray);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook, sheet, 'Sheet1');
XLSX.writeFile(workbook, 'data/lead.xlsx');
