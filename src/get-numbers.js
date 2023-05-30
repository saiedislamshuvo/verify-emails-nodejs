const XLSX = require('xlsx');
const fs = require('fs');

const workbook = XLSX.readFile('data/info.xlsx');

const worksheet = workbook.Sheets['Sheet1'];
const json = XLSX.utils.sheet_to_json(worksheet)

const jsonStr = JSON.stringify(json);
fs.writeFileSync('data/data.json', jsonStr);
