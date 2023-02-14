const fs = require("fs");
const axios = require("axios");
const Excel = require("exceljs");
const { SearchPages } = require("./functionPages");
require("dotenv").config();

const array = [];
const url = `${getFlagsValue('--url')}`

//"ish.com.br";
let results;
let pages;

function getFlagsValue (flag){
  const index = process.argv.indexOf(flag) +1
  return process.argv[index]
}

SearchPages(url, 1)
  .then((response) => {
    results = response.results;
    pages = response.pages
  })
  .catch((error) => {
    console.error(error);
  });

function getFormattedDateAndTime() {
    let date = new Date();
    let day = date.getDate().toString().padStart(2, '0');
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let year = date.getFullYear();
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    let seconds = date.getSeconds().toString().padStart(2, '0');
  
    return `${day}.${month}.${year}_${hours}h${minutes}m${seconds}s`;
}
  
async function fetchData(page) {
  if (page === 1) {
    console.log(`Iniciando processo para o site: ${url} | Aguarde...`);
  }
  if(page == pages){
    console.log(`Página: ${page}/${pages} -> ${results}/${results}`);
  } else{
    console.log(`Página: ${page}/${pages} -> ${20*page}/${results}`);
  }

  try {
    const response = await axios.post(
      "https://checkleakedcc-official.p.rapidapi.com/dehashed",
      {
        entry: url,
        type: "email",
        page: page,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.API_KEY,
          "X-RapidAPI-Key": process.env.RAPIAPI,
          "X-RapidAPI-Host": "checkleakedcc-official.p.rapidapi.com",
        },
      }
    );
    const data = response.data;
    data.entries.map((objeto) => {
      array.push(objeto.entry);
    });
  } catch (error) {
    console.error(error);
  }
}

let count = 1;

const main = setInterval(() => {
  fetchData(count).then(() => {
    if (count === pages) {
      let workbook = new Excel.Workbook();
      let worksheet = workbook.addWorksheet("Sheet1");

      worksheet.addRow([
        "Id",
        "Email",
        "Username",
        "Password",
        "Hashed Password",
        "Name",
        "Vin",
        "Address",
        "Ip Address",
        "Phone",
        "Obtained From",
        " Source Name",
        "Source Linked Unknow",
        "Source Linked Dehased",
        "Source Linked LeakCheck",
        "Source Linked HbwPwned",
        "Source Domain",
        "Source DataClasses",
        "Source BreachDate",
        "Source Extra",
        "Source Sources",
      ]);

      array.forEach(function (item) {
        worksheet.addRow([
          item.id,
          item.email,
          item.username,
          item.password,
          item.hashed_password,
          item.name,
          item.vin,
          item.address,
          item.ip_address,
          item.phone,
          item.obtained_from,
          item.source && item.source.Name ? item.source.Name : "N/A",
          item.source && item.source.Linked
            ? item.source.Linked.unknown
            : "N/A",
          item.source && item.source.Linked
            ? item.source.Linked.dehashed
            : "N/A",
          item.source && item.source.Linked
            ? item.source.Linked.leakCheck
            : "N/A",
          item.source && item.source.Linked
            ? item.source.Linked.hbwPwned
            : "N/A",
          item.source && item.source.Domain ? item.source.Domain : "N/A",
          item.source && item.source.DataClasses
            ? item.source.DataClasses
            : "N/A",
          item.source && item.source.BreachDate
            ? item.source.BreachDate
            : "N/A",
          item.source && item.source.extra ? item.source.extra : "N/A",
          item.source && item.source.Sources ? item.source.Sources : "N/A",
        ]);
      });

      workbook.xlsx.writeFile(`./DadosPlanilhas/dados_(${url})_${getFormattedDateAndTime()}.xlsx`).then(function () {
        console.log("Arquivo salvo com sucesso! Verifique a pasta 'DadosPlanilhas'.");
      });
      console.log(`Foram obtidos ${array.length} arquivos`);
      clearInterval(main);

      return;
    } else {
      count++;
    }
  });
}, 5000);
