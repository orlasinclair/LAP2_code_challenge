const express = require('express');
const router = express.Router();

const Post = require('../models/posts')

router.get('/', async (req, res) => {
    try {
        const posts = await Post.all;
        res.json({posts});
    } catch(err) {
        res.status(500).json({err});
    }
})

router.get('/:id', async (req,res) => {
    try{
        const postId = await Post.findById(req.params.id);
        res.json({postId});
    }catch (err) {
        res.status(500).json({err});
    }
})

router.post('/', async (req, res) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch(err) {
        res.status(422).json({err});
    }
})

module.exports = router;
