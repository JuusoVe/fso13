import { Router } from 'express'
import { Blog } from '../models/blog.js'

const router = Router()

router.get('/blogs', async (_req, res) => {
    try {
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }
})

router.post('/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }
})

router.delete('/blogs/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Blog.destroy({
            where: {
                id: id,
            },
        })
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }
})

export default router
