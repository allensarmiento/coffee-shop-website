var express = require("express");
var router = express.Router();
var User = require("../models/user");

var passport = require("passport");

// ==============
// AUTH ROUTES
// ==============

// show sign up form
router.get("/account", function(req, res) {
  res.render("account");
});

// handling users
router.post("/account/signUp", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if (err) {
      req.flash("error", err.message);
      return res.redirect("back");
    } 
    // logs the user in and stores user information using the local strategy
    // NOTE: If I'm not using a username and using an email, is there an email strategy?
    passport.authenticate("local")(req, res, function() {
      req.flash("success", "Welcome to CoffeeFix " + user.username);
      res.redirect("/");
    });
  });
});

// ==============
// LOGIN ROUTES
// ==============

// log user in
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/account",
  failureFlash: true
}), function(req, res) {
  
});

// log user out
router.get("/logout", function(req, res) {
  req.logout();
  req.flash("success", "Logged out");
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/account");
}

module.exports = router;