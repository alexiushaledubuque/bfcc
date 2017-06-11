var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var session = require('express-session');
var flash = require('connect-flash');
var validator = require('express-validator');

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/Shopping');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;