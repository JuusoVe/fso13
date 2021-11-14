import routes from './routes.js'
import dotenv from 'dotenv'
dotenv.config()
import sequelizePackage from 'sequelize'
import express from 'express'
const app = express()

app.use(express.json())

const { Sequelize, Model, DataTypes } = sequelizePackage
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

const connectDB = async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

export class Blog extends Model {}

const initBlog = () => {
    Blog.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            author: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            url: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            title: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            sequelize,
            underscored: true,
            timestamps: false,
            modelName: 'blog',
        }
    )
    Blog.sync()
}

connectDB()
initBlog()
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
app.use('/api', routes)
