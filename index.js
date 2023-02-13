const fs = require('fs')
const Excel = require('exceljs');
const array = []
require('dotenv').config()

async function fetchData(page) {
    const url = "itau.com.br"

    try {
      const response = await fetch('https://checkleakedcc-official.p.rapidapi.com/dehashed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.API_KEY,
          'X-RapidAPI-Key': process.env.RAPIAPI,
          'X-RapidAPI-Host': 'checkleakedcc-official.p.rapidapi.com'
        },
        body: `{"entry":"${url}","type":"email","page":${page}}`
      });

    const data = await response.json();

    data.entries.map((obj)=>{
      array.push(obj.entry)
    })
    return

    } catch (error) {
      console.error(error);
    }
}
  
let count = 1;
const intervalId = setInterval(() => {
    fetchData(count)
        .then(() => {
            if (count === 5) {
                let workbook = new Excel.Workbook();
                let worksheet = workbook.addWorksheet('Sheet1');

                worksheet.addRow(["Id", "Email", "Username", "Password", "Hashed Password", "Name", "Vin", "Address", "Ip Address", "Phone", "Obtained From", " Source Name","Source Linked Unknow", "Source Linked Dehased", "Source Linked LeakCheck", "Source Linked HbwPwned", "Source Domain", "Source DataClasses","Source BreachDate", "Source Extra", "Source Sources"]);

                array.forEach(function(item) {
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
                    item.source && item.source.Linked ? item.source.Linked.unknown : "N/A",
                    item.source && item.source.Linked ? item.source.Linked.dehashed : "N/A",
                    item.source && item.source.Linked ? item.source.Linked.leakCheck : "N/A",
                    item.source && item.source.Linked ? item.source.Linked.hbwPwned : "N/A",
                    item.source && item.source.Domain ? item.source.Domain : "N/A",
                    item.source && item.source.DataClasses ? item.source.DataClasses : "N/A",
                    item.source && item.source.BreachDate ? item.source.BreachDate : "N/A",
                    item.source && item.source.extra ? item.source.extra : "N/A",
                    item.source && item.source.Sources ? item.source.Sources : "N/A"]);
                });
                
                clearInterval(intervalId);

                workbook.xlsx.writeFile("dados.xlsx").then(function() {
                console.log("Arquivo salvo com sucesso.");
                });

            } else {
                count++;
            }
        });
}, 1000);

  
  