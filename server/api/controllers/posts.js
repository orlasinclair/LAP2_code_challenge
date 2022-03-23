const express = require('express');
const router = express.Router();

const post = require('../models/posts')

router.get('/', async (req, res) => {
    try {
        const posts = await post.all
        res.json({posts})
    } catch(err) {
        res.status(500).json({err})
    }
})

module.exports = router;
