const express = require('express');
const Post = require('../models/post');
const router = express.Router();

// GET /posts/
router.get('/', (req, res) => {
  _query()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(410).json({
        status: err.message
      })
      return;
    })
});

// POST /posts/new
router.post('/new', (req, res) => {
  let post = new Post();
  post.title = req.body.title;
  post.category = req.body.category;
  post.description = req.body.description;

  var postsArray = [];

  // check if a post exists - no recreation
  _query().then((data) => {
    data.forEach((post) => {
      postsArray.push(post.title);
    })

    if (postsArray.includes(post.title) === true) {
      console.log("Post already exists");
      res.json({
        message: `Post with title: ${post.title} already exists in the db`
      });
    } else {

      // create a new post
      Post.create(post, (err, posts) => {
        if (err) throw err;
        console.log("Post created successfully");
        res.json({
          title: post.title,
          body: post.description
        })
      })
    }
  })
});


// private functions
function _query() {
  return new Promise((resolve, reject) => {
    Post.find({}, (err, post) => {
      if (err) reject(err);
      resolve(post);
    });
  })
}

module.exports = router;
