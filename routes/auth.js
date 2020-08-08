const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");

router.get("/account", function(req, res) {
  res.render("account");
});

router.post("/account/signUp", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    } 

    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to CoffeeFix " + user.username);
      res.redirect("/");
    });
  });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/account",
  failureFlash: true
}), function(req, res) {});

router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
});

module.exports = router;
