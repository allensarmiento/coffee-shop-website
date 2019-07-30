const express = require("express");
const router = express.Router();
const Invoice = require("../models/invoice");
const middleware = require("../middleware");

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