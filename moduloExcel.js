const fs = require('fs');
const Excel = require('exceljs');

let workbook = new Excel.Workbook();
let worksheet = workbook.addWorksheet('Sheet1');

let jsonData = [
  {name: "John", age: 30, city: "New York"},
  {name: "Jane", age: 25, city: "London"},
  {name: "Jim", age: 35, city: "Paris"}
];

worksheet.addRow(["Id", "Email", "Username", "Password", , "Hashed Password"]);

jsonData.forEach(function(item) {
  worksheet.addRow([item.name, item.age, item.city]);
});

workbook.xlsx.writeFile("data.xlsx").then(function() {
  console.log("Arquivo salvo com sucesso.");
});
