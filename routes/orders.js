var express = require("express");
var router = express.Router();
var Invoice = require("../models/invoice");

router.get("/orders", isLoggedIn, function(req, res) {
  let customer = {
    id: req.user._id,
    username: req.user.username
  };
  Invoice.findOne({customer: customer}, function(err, invoice) {
    if (err) {
      console.log(err);
    } else {
      res.render("orders", {invoice: invoice});
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