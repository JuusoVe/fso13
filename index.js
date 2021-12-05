const express = require('express')
require('express-async-errors')
const { initDB } = require('./utils/db')
require('./models/index')
const blogRoutes = require('./controllers/blog')
const userRoutes = require('./controllers/user')
const loginRoutes = require('./controllers/login')
const authorRoutes = require('./controllers/author')

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
app.use('/api', loginRoutes)
app.use('/api', authorRoutes)
app.use(errorHandler)
