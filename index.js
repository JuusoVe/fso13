const express = require('express')
require('express-async-errors')
const { initDB } = require('./utils/db')
require('./models/index')
const blogRoutes = require('./routes/blog')
const userRoutes = require('./routes/user')
const { PORT } = require('./utils/config')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())

initDB()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

app.use('/api', blogRoutes)
app.use('/api', userRoutes)
app.use(errorHandler)
