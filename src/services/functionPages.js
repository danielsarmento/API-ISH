const fs = require('fs')
const axios = require('axios')
require('dotenv').config()

exports.SearchPages = async (url, page) => {
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
      let pages = response.data.pages
      let results = response.data.results
      return {pages, results}
      
    } catch (error) {
      console.error(error);
    }
}