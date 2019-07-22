var express = require("express");
var router = express.Router();
var Invoice = require("../models/invoice");
var middleware = require("../middleware");

router.get("/orders", middleware.isLoggedIn, function(req, res) {
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

module.exports = router;