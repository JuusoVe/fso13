const { Model, DataTypes } = require('sequelize')
const { sequelizeInstance } = require('../utils/db')

class Session extends Model {}

Session.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        isValid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        token: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        underscored: true,
        timestamps: true,
        modelName: 'session',
    }
)

module.exports = Session
