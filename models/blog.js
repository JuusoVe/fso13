const { Model, DataTypes } = require('sequelize')

class Blog extends Model {}

const initBlog = async (sequelizeInstance) => {
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
        },
        {
            sequelize: sequelizeInstance,
            underscored: true,
            timestamps: false,
            modelName: 'blog',
        }
    )
    try {
        await Blog.sync()
    } catch (err) {
        console.log(err)
    }
}

module.exports = { Blog, initBlog }
