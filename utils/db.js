const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelizeInstance = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
})

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
}

module.exports = { initDB, sequelizeInstance }
