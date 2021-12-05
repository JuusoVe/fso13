const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readinglist')
const Session = require('./session')

User.hasMany(Blog)
User.belongsToMany(Blog, { through: ReadingList })
Blog.belongsTo(User)
Blog.belongsToMany(User, { through: ReadingList })
Session.belongsTo(User)

module.exports = { Blog, User, ReadingList, Session }
