var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

var url = process.env.DATABASEURL || "mongodb://localhost:27017/Coffee_Shop";
mongoose.connect(url,  {useNewUrlParser: true});
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); // Expect ejs files
app.use(express.static(__dirname + "/public")); // Public folder for css styles

// NOTE: Mongoose by default add an S, so to prevent looking for Shops, specify to look for Shop as the 3rd parameter.
var shopSchema = new mongoose.Schema({
  blend: String,
  name: String,
  price: String,
  image: String
});
var Shop = mongoose.model("Shop", shopSchema, "Shop"); 

var storeSchema = new mongoose.Schema({
  city: String,
  street: String, 
  bgImage: String
});
var Stores = mongoose.model("Stores", storeSchema, "Stores");

// ============
//    ROUTES
// ============
app.get("/", function(req, res) {
  res.render("home");
});

app.get("/shop", function(req, res) {
  Shop.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("shop", {items: items});
    }
  })
});

app.get("/stores", function(req, res) {
  Stores.find({}, function(err, stores) {
    if (err) {
      console.log(err);
    } else {
      res.render("stores", {stores: stores});
    }
  })
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