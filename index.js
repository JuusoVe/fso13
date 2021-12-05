const express = require('express')
require('express-async-errors')
const initDB = require('./utils/db')
const routes = require('./routes/blog')
const { PORT } = require('./utils/config')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())

initDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.use('/api', routes)
app.use(errorHandler)
