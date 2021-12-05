const { Model, DataTypes } = require('sequelize')
const { sequelizeInstance } = require('../utils/db')

class User extends Model {}

User.init(
    {
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
    },
    {
        sequelize: sequelizeInstance,
        underscored: true,
        timestamps: true,
        modelName: 'user',
    }
)

module.exports = User
