const express = require("express");
const router = express.Router();
const Invoice = require('../models/invoice');
const middleware = require("../middleware");

router.get("/cart", function(req ,res) {
  res.render("cart");
});

router.get("/checkout", middleware.isLoggedIn, function(req, res) {
  res.render("checkout");
});

router.post("/checkout", middleware.isLoggedIn, function(req, res) {
  let user = {
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

  let newInvoice = { customer: user, items: items };
  Invoice.create(newInvoice, function(err, invoice) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("cart");
    }
  });
});

module.exports = router;