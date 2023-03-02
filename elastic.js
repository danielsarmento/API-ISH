
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://username:password@localhost:9200',
  cloud: {
    id: 'c26952c1147e4bdfb790677fa5e057d3:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyQ0NDg2ODYwZmExNjQ0YjBlYWQyZDgwZmVlM2I5NzI3MCRlM2Y3YzNiNDAyY2M0NjliYTA5ZmQ5ZWRmOWEzNjZhNQ==',
  },
  auth: {
    username: 'danielsarmento14@gmail.com',
    password: 'S@VGW7wyb2poXC2y2nxyee4Qxj'
  }
})

async function main () {
    const result = await client.search({
        index: "posts",
        query: { fuzzy: { title: "" } },
      });
    
      res.json(result);  
}

main();