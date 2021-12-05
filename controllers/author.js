const { Router } = require('express')
const { Blog } = require('../models/index')
const { sequelize } = require('../models/blog')

const router = Router()

router.get('/authors', async (_req, res) => {
    const queryObject = {
        attributes: [
            [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes'],
            [sequelize.fn('COUNT', sequelize.col('blog.id')), 'count'],
            'author',
        ],
        group: ['author'],
        order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
    }

    const blogs = await Blog.findAll(queryObject)
    return res.json(blogs)
})

module.exports = router
