const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')

User.hasMany(Blog)
User.belongsToMany(Blog, { through: ReadingList })
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: ReadingList })

module.exports = { Blog, User, ReadingList }
