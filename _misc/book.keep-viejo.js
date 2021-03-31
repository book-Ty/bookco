const express = require('express');
const bodyParser = require('body-parser');
const auth = require('http-auth');
const https = require("https")
const fs = require("fs");
const helmet = require("helmet");

// clavos de seguridad
/*
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/btevc.cf/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/btevc.cf/fullchain.pem")
};
*/

// configure basic auth
/*
var basic = auth.basic({
    realm: 'SUPER SECRET STUFF'
}, function(username, password, callback) {
    callback(username == 'admin' && password == 'f00lpr00f');
});
*/
// create express app
const app = express();

app.use(helmet()); // Add Helmet as a middleware

// CORS Header

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// create middleware that can be used to protect routes with basic auth
//var authMiddleware = auth.connect(basic);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = {
    url: 'mongodb://localhost:27017'
} /// <<<<<
var mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var db;

// Connecting to the database
MongoClient.connect(dbConfig.url, function(err, client) {
  if(err) return console.error(err);
  var db = client.db('btevcdb2');
  // the Mongo driver recommends starting the server here because most apps *should* fail to start if they have no DB.  If yours is the exception, move the server startup elsewhere.
  // define a simple route
  app.get('/', /* authMiddleware, */ (req, res, next) => {
      res.json({"message": "Bienvenido al BTEVCbookKeep."});
  });
  require('./book.spin.js')(app, db); /// <<<<<
  // listen for requests
  app.listen(3000, () => {
      console.log("Server is listening on port 3000");
  });
  //https.createServer(options, app).listen(9090);
});
