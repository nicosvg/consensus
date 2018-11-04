const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const serveStatic = require('serve-static')

// Serve front files
const frontDir = process.env.FRONT_DIR ? process.env.FRONT_DIR : '../front/dist'
console.log('Front directory: ' + frontDir)
app.use(serveStatic(frontDir))

app.use(bodyParser.json())
app.use(cors())

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})

const electionsController = require('./controllers').elections

app.get('/elections', (req, res) => electionsController.findAll(req, res))

app.post('/elections', electionsController.create)
