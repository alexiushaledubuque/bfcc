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
const MongoStore = require('connect-mongodb')(session);

// make route for products
//const productRoute = require('./appRoutes/index')
const Product = require('./models/product')

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/Shopping');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
// app.use(session({
//   secret: 'mysupersecret', 
//   resave: false, 
//   saveUninitialized: false,
//   //store: new MongoStore({ mongooseConnection: mongoose.connection }),
//   cookie: { maxAge: 180 * 60 * 1000 }
// }));
app.use(flash());

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

// Helper to format year for <footer>
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

// Helper to loop over the properties of the object - easy rendering in UI
hbs.registerHelper('eachProduct', ((context, options) => {
    var ret = "";
    for(var prop in context)
    {
        ret = ret + options.fn({property:prop,value:context[prop]});
    }
    return ret;
}));

app.get('/', (req, res) => {
  Product.find().then((docs) => {
    if (!docs) {
      console.log('DOCS NOT FOUND!')
    }
    var products = [];
    var excess = 3;
    for (var i = 0; i < docs.length; i += excess) {
        products.push(docs.slice(i, i + excess));
    }
    res.render('main.hbs', {
      pageTitle: 'Home Page',
      welcomeMessage: "Welcome to my home page! Howdy, I'm Alexius!",
      title: 'Shopping Cart', 
      products
    })
  }).catch((e) => {
    console.log('ERROR: ', e)
  }) 
});

module.exports = app;