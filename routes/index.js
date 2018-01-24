const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const db = require('monk')('localhost/Blogger');

    router.get('/', (req, res, next) => {
        var db = req.db;
        var posts = db.get('posts');
        posts.find({}, {}, function (err, posts) {
            res.render('index', {
                'posts': posts
            });
        });
    });

module.exports = router;