const { validationResult } = require('express-validator');

const Post = require('../models/post');

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    if (!posts.length) {
      throw new Error('Could not fetch posts');
    }

    res.status(200).json({
      posts: posts,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getPosts };
