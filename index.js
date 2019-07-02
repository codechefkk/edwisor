// import the packages
const bodyParser = require("body-parser");
const express    = require("express");
const mongoose   = require("mongoose");

const app        = express();

// configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const db         = require("./app/config/db.js");

mongoose.connect(db.url, db.options, (err) => {
  if (err) { console.warn(err); } else { console.log("Connected to database"); }
});

// Importing routes
const routes = require("./app/routes.js");

// REGISTER OUR ROUTES
app.use("/api", routes);

// Set up port
const port     = process.env.PORT || 9000;
app.listen(port);
console.log(`Edwisor - App is running on the port ${port}`);

module.exports = app;
