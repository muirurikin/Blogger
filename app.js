
// Require Modules
const express = require('express');
const path = require('path');
const logger = require('morgan');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const flash = require('connect-flash');

const config = require('./config/config');
const routes = require('./routes/index');
const posts = require('./routes/posts');

// connect to db
mongoose.connect(config.mongoUrl);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error'));
db.once('open', () => {
  console.log("Successfully connected to db");
})


// init app
const app = express();

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// static files
app.use(express.static(path.join(__dirname, 'public')));


app.locals.moment = require('moment');


// setup middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Sessions
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Validator
app.use(expressValidator({
  errorFormatter: function (param, msg, value) {
    var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

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

// Flash Messages
app.use(flash());

// serve routes
app.use('/', routes);
app.use('/posts', posts);

app.listen(config.port, () => {
  console.log(`Server running on: http://localhost:${config.port}`);
});
