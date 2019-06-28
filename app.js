var express = require("express");
var app = express();

app.use(express.static("public")); // Public folder for css styles
app.set("view engine", "ejs"); // Expect ejs files

app.get("/", function(req, res) {
  res.render("home");
});

// ============ TODO: Data for Shop ===============
var items = [
  {blend: "Dark", name: "Dark Expresso", price: "$0.00", image: "https://cdn.shopify.com/s/files/1/0002/1115/7052/products/brazil1_dkroast_400.jpg?v=1549596309"},
  {blend: "Dark", name: "Haitian", price: "$0.00", image: "https://www.holybeanscafe.com/holybeanscafe/wp-content/uploads/2015/11/dark-roast-coffee.jpg"},
  {blend: "Dark", name: "Paris", price: "0.00", image: "http://cdn.shopify.com/s/files/1/2217/5179/products/frc-french-roast-roasted-coffee-beans_grande.jpg?v=1505296912"},
  {blend: "Dark", name: "Mocha Java", price: "0.00", image: "https://sep.yimg.com/ay/yhst-133788258843600/mocha-java-organic-coffee-beans-41.gif"},
  
  {blend: "Medium", name: "Medium Expresso", price: "0.00", image: "https://www.coffeebeandirect.com/media/catalog/product/cache/1/image/0dc6da5b2fe15547a809e30525508fd7/m/e/medium-roast-espresso-wide.jpg"},
  {blend: "Medium", name: "Coffee Club", price: "0.00", image: "https://static1.squarespace.com/static/59d9113c90bade192af3e3a0/t/5a2dc13b53450ab787d59f99/1512948028366/food-beans-coffee-drink.jpg"},
  {blend: "Medium", name: "Colombia", price: "0.00", image: "http://www.topratedcoffeebeans.com/wp-content/uploads/2014/11/Vienna-roast-beans-300x300.png"},
  
  {blend: "Light", name: "", price: "", image: ""},
  {blend: "", name: "", price: "", image: ""},
];

app.get("/shop", function(req, res) {
  res.render("shop");
});
// ================================================

// ============= Stores ===========================
var stores = [
  {city: "San Francisco", street: "Golden Gate", bgImage: "https://images.unsplash.com/photo-1487132906645-8e0fbba067e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
  {city: "San Francisco", street: "Mission District", bgImage: "https://images.unsplash.com/photo-1439396087961-98bc12c21176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1780&q=80"},
  {city: "San Francisco", street: "Midtown Terrace", bgImage: "https://images.unsplash.com/photo-1445359179985-460648949e10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"},
  {city: "San Francisco", street: "University Mound", bgImage: "https://images.unsplash.com/photo-1458169495136-854e4c39548a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  
  {city: "Los Angeles", street: "Chinatown", bgImage: "https://images.unsplash.com/photo-1521123493239-e0f9ae0445ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
  {city: "Los Angeles", street: "Fashion District", bgImage: "https://images.unsplash.com/photo-1557882518-693670985a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"},
  {city: "Los Angeles", street: "Rampart Village", bgImage: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},

  {city: "New York", street: "East Village", bgImage: "https://images.unsplash.com/photo-1512486046-0d05000458ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"},
  {city: "New York", street: "Brooklyn Heights", bgImage: "https://images.unsplash.com/photo-1484861671664-4ebd42ced711?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  {city: "New York", street: "Greenpoint", bgImage: "https://images.unsplash.com/photo-1450705354661-932f7b21aa51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
];

app.get("/stores", function(req, res) {
  res.render("stores", {stores:  stores});
});
// ================================================

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