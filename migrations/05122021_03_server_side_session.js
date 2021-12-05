const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('sessions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'users', key: 'id' },
            },
            is_valid: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            created_at: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
            updated_at: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.fn('now'),
            },
        })
        await queryInterface.addColumn('users', 'banned', {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        })
    },
    down: async (queryInterface) => {
        await queryInterface.removeColumn('users', 'banned')
        await queryInterface.dropTable('sessions')
    },
}
