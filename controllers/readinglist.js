const { Router } = require('express')
const requireAuth = require('../middleware/requireAuth')
const { ReadingList } = require('../models/index')

const router = Router()

router.post('/readinglists', async (req, res) => {
    const readingList = await ReadingList.create({
        userId: req.body.user_id,
        blogId: req.body.blog_id,
        isRead: false,
    })
    return res.json(readingList)
})

router.put('/readinglists/:id', requireAuth, async (req, res) => {
    const readingList = await ReadingList.findByPk(req.params.id)
    if (!readingList) {
        return res.status(404).end()
    }
    if (readingList.userId !== req.decodedToken.id) {
        return res.status(403).end()
    }
    const read = req.body.read
    if (!(read === true)) {
        return res.status(400).end()
    }
    readingList.isRead = true
    await readingList.save()
    return res.json(readingList)
})

module.exports = router
