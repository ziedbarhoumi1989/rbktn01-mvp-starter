var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var items = require("../database-mongo");

var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
// ADDED FOR TESTING
//app.set("views", __dirname + "../react-client/src");
//app.set("view engine", "ejs");

// UNCOMMENT FOR REACT

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
app.get("/", (req, res) => {
  console.log("here");
  res.redirect("/signin");
  next();
});
app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
});
app.post("/user", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
app.get("/user", (req, res) => {
  console.log(req.body);
  res.sendFile(path.join(__dirname, "../react-client/dist/index.html"));
});
app.get("/items", function(req, res) {
  items.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
