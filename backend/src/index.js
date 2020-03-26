const express = require('express') // Importa o Express
const cors = require('cors')

const routes = require('./routes')

const app = express() // Instancia o Express

app.use(cors())
app.use(express.json())
app.use(routes)

// Retorna um Server
app.listen(3333, () => console.log('Server running...'))