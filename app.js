var express = require("express");
var app = express();

app.use(express.static("public")); // Public folder for css styles
app.set("view engine", "ejs"); // Expect ejs files

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/shop", function(req, res) {
  res.render("shop");
});

app.get("/stores", function(req, res) {
  res.render("stores");
});

app.get("/story", function(req, res) {
  res.render("story");
});

app.get("/joinUs", function(req, res) {
  res.render("joinUs");
});

app.get("/account", function(req, res) {
  res.render("account");
});

// Listening on localhost
app.listen(8000, function() {
  console.log("Server is listening!!");
});

// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log("Server is listening!!");
// });