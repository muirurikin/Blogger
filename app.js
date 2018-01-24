// Require Modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const db = require('monk')('localhost/Blogger');
const multer = require('multer');
const flash = require('connect-flash');

const routes = require('./routes/index');
const posts = require('./routes/posts');
const categories = require('./routes/categories');

// init app
const app = express();

app.locals.moment = require('moment');

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Handle File Uploads
//app.use(multer({ dest: './public/img/uploads'}));

// setup middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Sessions
app.use(session ({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Validator
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
        ,root = namespace.shift()
        ,formParam = root;

    while (namespace.length) {
        formParam += '[' + namespace.shift() + ']';
    }
    return {
        param: formParam,
        msg: msg,
        value: value
    };
    }
}));

app.use(express.static(path.join(__dirname, 'public')));

// Flash Messages
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Make DB accesible to router
app.use(function (req, res, next) {
    req.db = db;
    next();
});
app.use('/', routes);
app.use('/posts', posts);
app.use('/categories', categories);

//Catch 404 and forward to error handler
app.use( (req, res, next) => {
    let err = new Error('Not Found !');
    err.status = 404;
    next(err);
});


app.listen(3000, () => {
    console.log('Express app Listening on Port 3000');
});