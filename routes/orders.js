var express = require("express");
var router = express.Router();
var Invoice = require("../models/invoice");

router.get("/orders", isLoggedIn, function(req, res) {
  let customer = {
    id: req.user._id,
    username: req.user.username
  };
  Invoice.find({customer: customer}, function(err, invoices) {
    if (err) {
      console.log(err);
    } else {
      res.render("orders", {invoices: invoices});
    }
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/account");
}

module.exports = router;