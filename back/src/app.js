const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})

const electionsController = require('./controllers').elections

app.get('/elections', (req, res) => electionsController.findAll(req, res))

app.post('/elections', electionsController.create)
