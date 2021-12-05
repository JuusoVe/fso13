const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')
const { initBlog } = require('../models/blog')

const initSequelizeInstance = () => {
    const sequelizeInstance = new Sequelize(DATABASE_URL, {
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    })
    return sequelizeInstance
}

const connectDB = async (sequelizeInstance) => {
    try {
        await sequelizeInstance.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

const initDB = async () => {
    const sequelizeInstance = initSequelizeInstance()
    await connectDB(sequelizeInstance)
    await initBlog(sequelizeInstance)
}

module.exports = initDB
