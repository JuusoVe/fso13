const { rollbackMigrations, sequelizeInstance } = require('./db')

rollbackMigrations()

/*

const queryInterface = sequelizeInstance.getQueryInterface()

const fuckTheTables = async () => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('migrations')
}

fuckTheTables()

*/
