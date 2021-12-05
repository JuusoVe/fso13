const { Router } = require('express')
const tokenExtractor = require('../middleware/tokenExtractor')
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

module.exports = router
