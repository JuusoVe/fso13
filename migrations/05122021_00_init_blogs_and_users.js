const { DataTypes, Sequelize } = require('sequelize')

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.createTable('blogs', {
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
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        })
        await queryInterface.addColumn('blogs', 'user_id', {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        })
    },
    down: async (queryInterface) => {
        console.log('rolling back, dropping tables')
        await queryInterface.dropTable('blogs')
        await queryInterface.dropTable('users')
    },
}
