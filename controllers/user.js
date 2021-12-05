const { Router } = require('express')
const { User, Blog, ReadingList } = require('../models/index')

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

router.get('/users/:id', async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.params.id,
        },
        attributes: ['name', 'username'],
        include: [
            {
                model: Blog,
                attributes: ['id', 'author', 'title', 'likes', 'year', 'url'],
                through: {
                    attributes: ['isRead', 'id'],
                },
            },
        ],
    })
    res.json(user)
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
