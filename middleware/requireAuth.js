const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const { Session } = require('../models/session')

const extractToken = (req) => {
    const token = getToken(req)
    if (!token) {
        return res.status(401).json({ errors: ['token missing'] })
    }
    try {
        req.decodedToken = jwt.verify(token, JWT_SECRET)
        return req
    } catch (error) {
        return res.status(401).json({ errors: ['token invalid'] })
    }
}

const requireAuth = (req, res, next) => {
    req = extractToken(req)
    const session = Session.findOne({
        where: { token: getToken(req), isValid: true, userId: decodedToken.id },
    })
    if (!session) {
        return res.status(403).json({ errprs: ['no session found for token'] })
    }
    next()
}

const getToken = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return false
}

module.exports = requireAuth
