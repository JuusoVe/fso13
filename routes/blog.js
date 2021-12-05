const { Router } = require('express')
const { Blog } = require('../models/blog')

const router = Router()

router.get('/blogs', async (_req, res) => {
    const blogs = await Blog.findAll()
    return res.json(blogs)
})

router.post('/blogs', async (req, res) => {
    const blog = await Blog.create(req.body)
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
        res.status(404).end()
    } else {
        blog.likes = req.body.likes
        await blog.save()
        res.json(blog)
    }
})

module.exports = router
