const { Router, response } = require('express')
const { User } = require('../models/index')
const { Session } = require('../models/session')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const router = Router()

router.post('/login', async (req, res) => {
    const passwordCorrect = req.body.password === 'Salainen1'
    const user = await User.findOne({
        where: { username: req.body.username, banned: false },
    })
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            errors: ['Invalid username or password.'],
        })
    }

    const userForToken = {
        username: user.username,
        id: user.id,
        name: user.name,
    }

    const token = jwt.sign(userForToken, JWT_SECRET)

    const session = await Session.create({ userId: user.id, token })

    res.status(200).send({ token, ...userForToken })
})

module.exports = router
