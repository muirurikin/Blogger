const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Hello! Render index.jade here");

  // if you want to render all posts, then you query here
  // res.render('index.jade')
});

module.exports = router;
