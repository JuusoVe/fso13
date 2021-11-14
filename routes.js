import { Router } from 'express'
import { Blog } from './index.js'

const router = Router()

router.get('/blogs', async (req, res) => {
    try {
        console.log(req.body)
        const blogs = await Blog.findAll()
        return res.json(blogs)
    } catch (err) {
        console.log(err)
        return res.status(400).json({ err })
    }
})

router.post('/blogs', async (req, res) => {
    try {
        console.log('req body:')
        console.log(req.body)
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
