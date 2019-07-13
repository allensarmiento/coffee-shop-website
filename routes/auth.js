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
      console.log(err);
      return res.render("account");
    } 
    // logs the user in and stores user information using the local strategy
    // NOTE: If I'm not using a username and using an email, is there an email strategy?
    passport.authenticate("local")(req, res, function() {
      res.redirect("/");
    });
  });
});

// ==============
// LOGIN ROUTES
// ==============

// middleware
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/account"
}), function(req, res) {
});

// log user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/account");
}

module.exports = router;