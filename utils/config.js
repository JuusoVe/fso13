require('dotenv').config()

const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET

module.exports = { DATABASE_URL, PORT, JWT_SECRET }
