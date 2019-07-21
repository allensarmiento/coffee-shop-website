var express = require("express");
var router = express.Router();

router.get("/cart", isLoggedIn, function(req ,res) {
  res.render("cart");
});

router.post("/cart/checkout", function(req, res) {
  // console.log(req.body.items);
  console.log(req.body.items);
  res.redirect("/cart");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/account");
}

module.exports = router;