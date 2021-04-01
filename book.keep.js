/*::::
Basic Express server
::::*/

const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const BookCo = require('./book.co.js');

// Create express app
const app = express();

// Add Helmet as a middleware
app.use(helmet());

// Add CORS Header
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parse application/json
app.use(bodyParser.json())

// Configure the database
const dbConfig = {
    url: 'mongodb://localhost:27017',
    db: 'btevcdb2',
    collection: "entities"
}

// Set global BookCo var
var bookCo;

async function main() {

  // Load from config
  bookCo = await new BookCo(dbConfig.url, dbConfig.db);

  // Add routes
  require('./book.flo.js')(app, bookCo, dbConfig);

  // listen for requests
  app.listen(8002, () => {
      console.log("Server is listening on port 8002");
  });
}

main();
