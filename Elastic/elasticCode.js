const { Client } = require('@elastic/elasticsearch')

const client = new Client({
  cloud: {
    id: "ClusterTeste:dXMtd2VzdDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ0ZTYxOGIyN2ZjZTU0NGI0YmE5Y2U1YTcyMDgwNmEwYiRkZTQ0OGJhOTNkYTU0ODU3OGZlN2RkZThiOGFhMDc3YQ=="
  },
  auth: {
    username: "elastic",
    password: "AyubfVQnbkCkoWFrDkfelh3x"
  }
})

function informations () {
    client.info()
      .then(response => console.log(response))
      .catch(error => console.error(error));
}

async function createIndex (index) {
    await client.indices.create({
        index: `${index}`,
        operations: {
          mappings: {
            properties: {
              id: { type: 'integer' },
              text: { type: 'text' },
              user: { type: 'keyword' },
              time: { type: 'date' }
            }
          }
        }
      }, { ignore: [400] })
      return
}

async function createData (index, name, email, description ) {
    try{
        await client.index({
            index: `${index}`,
            document: {
                name: `${name}`,
                email: `${email}`,
                description: `${description}`
            }
        })
        console.log("Sucess")
        return
    } catch (err) {
        console.error(err)
    }
} 

async function readData(index) {
    try{
        const response = await client.search({
            index: `${index}`,
            //_source: ['name'], -> Caso precise de um campo específico apenas
            query: {
              match_all: {}
            }
          })
          console.log(response.hits.hits)

        return
    } catch (err) {
        console.error(err)
    }
}

  
run("dados_03_03_2023")
//createData("dados_03_03_2023", "Flávia Venturini", "flaviateste@hotmail.com", "Teste de API")