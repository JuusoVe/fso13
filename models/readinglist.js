const { Model, DataTypes } = require('sequelize')
const { sequelizeInstance } = require('../utils/db')

class ReadingList extends Model {}

ReadingList.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'blogs', key: 'id' },
        },
        blogId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            default: false,
        },
    },
    {
        sequelize: sequelizeInstance,
        underscored: true,
        timestamps: false,
        modelName: 'readinglist',
    }
)

module.exports = ReadingList
