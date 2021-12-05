const { Router } = require('express')
const tokenExtractor = require('../middleware/tokenExtractor')
const { Blog, User } = require('../models/index')
const { Op } = require('sequelize')

const router = Router()

router.get('/blogs', async (req, res) => {
    const searchTerm = req.query.search ?? null

    const baseQueryObject = {
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name'],
        },
        order: [['likes', 'DESC']],
    }

    const queryObject = searchTerm
        ? {
              ...baseQueryObject,
              where: {
                  [Op.or]: [
                      { title: { [Op.iLike]: '%' + searchTerm } },
                      { author: { [Op.iLike]: '%' + searchTerm } },
                  ],
              },
          }
        : baseQueryObject

    console.log(queryObject)

    const blogs = await Blog.findAll(queryObject)
    return res.json(blogs)
})

router.post('/blogs', tokenExtractor, async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.decodedToken.id,
        },
    })
    const blog = await Blog.create({ ...req.body, userId: user.id })
    return res.json(blog)
})

router.delete('/blogs/:id', async (req, res) => {
    const id = req.params.id
    await Blog.destroy({
        where: {
            id: id,
        },
    })
    res.status(204).end()
})

router.put('/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (!blog) {
        return res.status(404).end()
    } else {
        blog.likes = req.body.likes
        await blog.save()
        res.json(blog)
    }
})

module.exports = router
