const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const db = require('monk')('localhost/Blogger');

    router.get('/', (req, res, next) => {
        res.render('addcategory');
    });

module.exports = router;