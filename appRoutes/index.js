const exp = require('express')
const router = exp.Router()

const Product = require('../models/product')

console.log('EXECUTING INDEX.JS!!!')

// query for products to display on main page
// router.get('/', (req, res) => {
// 	Product.find((err, docs) => {
// 		if (err) {
// 			console.log('failed to get docs')
// 		}
// 		console.log('DOCS: ', docs)
// 	})	
// })

/* GET home page. */
router.get('/', function (req, res, next) {
		console.log('RUNNING PRODUCT.FIND')
    var successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {title: 'Shopping Cart', products: productChunks, successMsg: successMsg, noMessages: !successMsg});
    });
});


module.exports = router;