const { Router, response } = require('express')
const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../utils/config')
const router = Router()

router.post('/login', async (req, res) => {
    const passwordCorrect = req.body.password === 'Salainen1'
    const user = await User.findOne({
        where: { username: req.body.username },
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

    res.status(200).send({ token, ...userForToken })
})

module.exports = router
