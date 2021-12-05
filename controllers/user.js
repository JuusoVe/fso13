const { Router } = require('express')
const requireAuth = require('../middleware/requireAuth')
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

router.get('/users/:id', requireAuth, async (req, res) => {
    if (parseInt(req.params.id) !== parseInt(req.decodedToken.id)) {
        return res.status(403).end()
    }
    const read = req.query.read
    const readIsValid = read === ('true' || false)
    if (!readIsValid) {
        return res.status(400).end()
    }
    const readConditionObject = req.query.read
        ? { where: { isRead: req.query.read === 'true' } }
        : {}

    const queryObject = {
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
                    ...readConditionObject,
                },
            },
        ],
    }

    const user = await User.findOne(queryObject)
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
