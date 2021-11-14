import routes from './routes/blog.js'
import express from 'express'
import { connectDB, initSequelizeInstance } from './utils/db.js'
import { initBlog } from './models/blog.js'
import { PORT } from './utils/config.js'

const app = express()
app.use(express.json())

const sequelizeInstance = initSequelizeInstance()
await connectDB(sequelizeInstance)
await initBlog(sequelizeInstance)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.use('/api', routes)
