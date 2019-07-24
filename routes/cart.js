var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Invoice = require('../models/invoice');
var Shop = require("../models/shop");
var middleware = require("../middleware");

router.get("/cart", function(req ,res) {
  res.render("cart");
});

router.get("/checkout", middleware.isLoggedIn, function(req, res) {
  res.render("checkout");
});

router.post("/checkout", middleware.isLoggedIn, function(req, res) {
  var user = {
    id: req.user._id,
    username: req.user.username
  };
  items = [];
  req.body.items.forEach(function(item) {
    items.push({
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity
    });
  });
  console.log(items);
  var newInvoice = {customer: user, items: items};
  Invoice.create(newInvoice, function(err, invoice) {
    if (err) {
      console.log(err);
    } else {
      console.log("Added new invoice");
      res.redirect("cart");
    }
  });
});

module.exports = router;