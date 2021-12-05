const { Model, DataTypes } = require('sequelize')
const { sequelizeInstance } = require('../utils/db')

class Blog extends Model {}

Blog.init(
    {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isValidYear(year) {
                    if (year < 1991 || year > new Date().getFullYear()) {
                        throw new Error('Not a valid year.')
                    }
                },
            },
        },
    },
    {
        sequelize: sequelizeInstance,
        underscored: true,
        timestamps: true,
        modelName: 'blog',
    }
)

module.exports = Blog
