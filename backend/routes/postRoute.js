const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware')
const Post = require('../models/Post');

router.post('/posts', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      user: req.user.id, 
    });

    const post = await newPost.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/posts', async (req, res) => {
    try {
      const posts = await Post.find().populate('user', ['username', 'email']); 
  
      res.json(posts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
