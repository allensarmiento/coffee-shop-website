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

// Listening on localhost
app.listen(8000, function() {
  console.log("Server is listening!!");
});

// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log("Server is listening!!");
// });