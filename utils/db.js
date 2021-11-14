import sequelizePackage from 'sequelize'
import { DATABASE_URL } from './config.js'

const { Sequelize } = sequelizePackage

export const initSequelizeInstance = () => {
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

export const connectDB = async (sequelizeInstance) => {
    try {
        await sequelizeInstance.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}
