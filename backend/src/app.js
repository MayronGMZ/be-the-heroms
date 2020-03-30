const express = require('express') // Importa o Express
const cors = require('cors')
const { errors } = require('celebrate')

const routes = require('./routes')

const app = express() // Instancia o Express

app.use(cors())
app.use(express.json())
app.use(routes)
app.use(errors())

module.exports = app