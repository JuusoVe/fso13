const { Router, response } = require('express')
const { User } = require('../models/index')
const { Session } = require('../models/session')
const requireAuth = require('../middleware/requireAuth')
const router = Router()

router.DELETE('/logout', requireAuth, async (req, res) => {
    const user = await User.findOne({
        where: { id: req.decodedToken.id },
    })
    if (!user) {
        return response.status(401).json({
            errors: ['No user found.'],
        })
    }

    await Session.destroy({
        where: {
            userId: req.decodedToken.id,
        },
    })

    res.status(200).send()
})

module.exports = router
