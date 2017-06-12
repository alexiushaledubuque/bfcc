const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const validator = require('express-validator');
const hbs = require('hbs')
const fs = require('fs') // server log

const MongoStore = require('connect-mongo')(session);

const Product = require('./models/product')
var Cart = require('./models/cart');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('localhost:27017/Shopping');

app.engine('hbs', expressHbs({extname:'hbs', defaultLayout:'main'}));
app.set('view engine', 'hbs');

// hbs.registerPartials(__dirname + '/views/partials')
// app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  key: 'app.sess',
  secret: 'SEKR37',
  resave: false, 
  saveUninitialized: false,
  store: new MongoStore({ 
    db: 'Shopping',
    host: '127.0.0.1',
    port: 27017,
    url: 'mongodb://localhost:27017/Shopping'
  }),
  cookie: {
    maxAge: 180 * 60 * 1000
  }
}));

app.use(flash());

app.use((req, res, next) => { // middleware 
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

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
        ret = ret + options.fn({product:prop,value:context[prop]});
    }
    return ret;
}));

app.get('/', (req, res) => {
  var successMsg = req.flash('success')[0];
  Product.find().then((docs) => {
    if (!docs) {
      console.log('DOCS NOT FOUND!')
    }
    var products = [];
    var excess = 3;
    for (var i = 0; i < docs.length; i += excess) {
        products.push(docs.slice(i, i + excess));
    }
    res.render('shop/index', { 
      products,
      successMsg,
      noMessages: !successMsg
    })
  }).catch((e) => {
    console.log('ERROR: ', e)
  }) 
});

app.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function(err, product) {
       if (err) {
           return res.redirect('/');
       }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});

app.get('/extra-one/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.updatePlusOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}); 

app.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.deductOne(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
}); 

app.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shopping-cart');
});

app.get('/shopping-cart', function(req, res, next) {
   if (!req.session.cart) {
       return res.render('shop/shopping-cart', {products: null});
   } 
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {
      products: cart.generateArray(), 
      totalPrice: cart.totalPrice
    });

});

app.get('/shopping-cart/checkout', function(req, res, next) {
    console.log('Rendering View!')
    res.render('shop/complete', {title: 'Bread Complete'});
    //res.redirect('/')
});

app.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/checkout', {
      total: cart.totalPrice, 
      errMsg: errMsg, 
      noError: !errMsg
    });
});

app.post('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('shop/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    req.flash('success', 'Order Complete!');
    req.session.cart = null;
    res.redirect('/'); 
});

app.get('/account/signin', function(req, res, next) {
  res.render('account/signin');
});

app.get('/account/logout', function(req, res, next) {
  console.log('logging out')
  res.render('/');
});

app.get('/account/signup', function(req, res, next) {
  res.render('account/signup');
});

app.get('/account/profile', function(req, res, next) {
  res.render('account/profile');
});

module.exports = app;
