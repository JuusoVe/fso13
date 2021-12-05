const { Router } = require('express')
const { User, Blog } = require('../models/index')

const router = Router()

router.get('/users', async (_req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId', 'username'] },
        },
    })
    return res.json(users)
})

router.post('/users', async (req, res) => {
    const user = await User.create(req.body)
    return res.json(user)
})

router.put('/users/:username', async (req, res) => {
    const user = await User.findOne({
        where: { username: req.params.username },
    })
    if (!user) {
        res.status(404).end()
    } else {
        user.name = req.body.name
        await user.save()
        res.json(user)
    }
})

module.exports = router
