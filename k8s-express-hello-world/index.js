const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Hello World!')
})

app.listen(port, () => {
  console.log(`K8s Express Hello World app listening on port ${port}`)
})