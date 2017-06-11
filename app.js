const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const validator = require('express-validator');
const hbs = require('hbs')
const fs = require('fs')

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/Shopping');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());

app.use((req, res, next) => { // middleware 
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log) // logger of each request
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.')
    };
  })

  next(); // middleware expression is done - do the next operation
})

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

app.get('/', (req, res) => {
  res.render('main.hbs', {
    // pageTitle: 'Home Page',
    // welcomeMessage: "Welcome to my home page! Howdy, I'm Alexius!"
  })
});









module.exports = app;