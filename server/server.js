// Create the server
// Load the products in the database
// Start the server

var app = require('../app');
var http = require('http');
var fs = require('fs')

var port = process.env.PORT || '9000';

// remove server.log file
fs.unlinkSync('server.log')

// drop previous database before loading new data
// load data in the database when server starts
var cp = require('child_process');
cp.fork(__dirname + '/db/dbs-cleanup.js');
cp.fork(__dirname + '/db/product-data.js');

app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})