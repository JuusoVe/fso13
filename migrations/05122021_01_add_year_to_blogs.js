const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.addColumn('blogs', 'year', {
            type: DataTypes.INTEGER,
            allowNull: false,
        })
    },
    down: async (queryInterface) => {
        console.log('removing column year from table blogs')
        await queryInterface.removeColumn('blogs', 'year')
    },
}
