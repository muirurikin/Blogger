const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const db = require('monk')('localhost/Blogger');

    router.get('/add', (req, res, next) => {
        var categories = db.get('categories');
        categories.find({}, {}, function (err, categories) {
            res.render('addpost', {
                'categories': categories
            });
        });
    });
    router.post('/add', (req, res, next) => {
        var title = req.body.title;
        var category = req.body.category;
        var body = req.body.body;
        var author = req.body.author;
        var date = new Date();

        // if(req.files.mainimage) {
        //     var mainImageName = req.files.mainimage.name;
        //     var mainImageMime = req.files.mainimage.mimetype;
        //     var mainImagePath = req.files.mainimage.path;            
        //     var mainImageExt = req.files.mainimage.extension;
        //     var mainImageSize = req.files.mainimage.size;            
        // } else {
        //     var mainImageName = 'noImage.png';
        // }

        // Validation
        req.checkBody('title', 'A Title Is Required').notEmpty();
        req.checkBody('body', 'Blog Post Body Is Required').notEmpty();

        // Check For Errors
        var errors = req.validationErrors();

        if(errors) {
            res.render('addpost', {
                'errors': errors,
                'title': title,
                'body': body
            });
        } else {
            var posts = db.get('posts');

            // Send To DB
            posts.insert({
                "title" : title,
                "category" : category,
                "author" : author,
                "body" : body,
                "date": date
                // "mainimage": mainImageName
            }, (err, post) => {
                if(err) {
                    res.send('An Error Occured While Submitting Your Post');
                } else {
                    req.flash('success', 'Your Post Has Been Successfuly Submitted');
                    res.location('/');
                    res.redirect('/');
                }
            });
        }
    });

module.exports = router;