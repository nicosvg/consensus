const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const serveStatic = require('serve-static')
const { ElectionsController } = require('./controllers')

// Serve front files
const frontDir = process.env.FRONT_DIR ? process.env.FRONT_DIR : '../front/dist'
app.use(serveStatic(frontDir))

app.use(bodyParser.json())
app.use(cors())

app.get('/hello', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
})

// Routes
app.get('/elections', (req, res) => ElectionsController.findAll(req, res))
app.get('/elections/:id', (req, res) => ElectionsController.findOne(req, res))
app.post('/elections', (req, res) => ElectionsController.create(req, res))
