const fs = require('fs')
const axios = require('axios')
const Excel = require('exceljs')
const array = [];
require('dotenv').config()

async function fetchData(page) {
    const url = "ish.com.br"
    
    console.log(`Iniciando processo...`)
    
    console.log(`Página: ${page}`)

    try {
      const response = await axios.post('https://checkleakedcc-official.p.rapidapi.com/dehashed', {
        entry: url,
        type: 'domain',
        page: page
      }, {
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.API_KEY,
          'X-RapidAPI-Key': process.env.RAPIAPI,
          'X-RapidAPI-Host': 'checkleakedcc-official.p.rapidapi.com'
        }
      });
      const data = response.data;
      console.log(data)
      data.entries.map((objeto) => {
        array.push(objeto.entry);
      });
    } catch (error) {
      console.error(error);
    }
}

fetchData(15)