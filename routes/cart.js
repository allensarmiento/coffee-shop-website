var express = require("express");
var router = express.Router();
var User = require("../models/user");
var Invoice = require('../models/invoice');
var Shop = require("../models/shop");
var Item = require("../models/item");

router.get("/cart", function(req ,res) {
  res.render("cart");
});

router.get("/checkout", isLoggedIn, function(req, res) {
  res.render("checkout");
});

router.post("/checkout", function(req, res) {
  console.log(req.body.items);

  var user = {
    id: req.user._id,
    username: req.user.username
  };

  items = [];
  req.body.items.forEach(function(item) {
    items.push({
      name: item.name,
      image: item.image,
      quantity: item.quantity
    });
  });
  // req.body.items.forEach(function(purchase) {
  //   Shop.findOne({name: purchase}, function(err, item) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(item);
  //       items.push({
  //         name: item.name,
  //         price: item.price,
  //         image: item.image
  //       });
  //     }
  //   });
  // });

  console.log(items);
  var newInvoice = {customer: user, items: items};

  // Create invoice first
  Invoice.create(newInvoice, function(err, invoice) {
    if (err) {
      console.log(err);
    } else {
      // success
      console.log("Added new invoice");
      res.redirect("cart");
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "Please login first");
  res.redirect("/account");
}

module.exports = router;