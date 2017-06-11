// Create the server
// Load the products in the database
// Start the server

var app = require('../app');
var http = require('http');

var port = process.env.PORT || '9000';

// load data in the database during server start
var cp = require('child_process');
cp.fork(__dirname + '/db/product-data.js');

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})