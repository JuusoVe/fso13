const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')
const Umzug = require('umzug')

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
        await runMigrations()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

const initDB = async () => {
    await connectDB(sequelizeInstance)
}

const migrationConf = {
    storage: 'sequelize',
    storageOptions: {
        sequelize: sequelizeInstance,
        tableName: 'migrations',
    },
    migrations: {
        params: [sequelizeInstance.getQueryInterface()],
        path: `${process.cwd()}/migrations`,
        pattern: /\.js$/,
    },
}
const runMigrations = async () => {
    const migrator = new Umzug(migrationConf)
    const migrations = await migrator.up()
    console.log('Completed migrations: ', {
        files: migrations.map((mig) => mig.file),
    })
}
const rollbackMigrations = async () => {
    await sequelizeInstance.authenticate()
    const migrator = new Umzug(migrationConf)
    await migrator.down()
}

module.exports = { initDB, sequelizeInstance, rollbackMigrations }
