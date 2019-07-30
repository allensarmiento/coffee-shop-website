const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const Invoice = require("../models/invoice");

// ==============
// AUTH ROUTES
// ==============

// show sign up form
router.get("/account", function(req, res) {
  res.render("account");
});

// handling users
router.post("/account/signUp", function(req, res) {
  // NOTE: Since this is a mockup application, to prevent the number of users being infinite, only 100 users can be registered
  User.countDocuments({}, function(err, count) {
    console.log("Number of users before: ", count);
    if (count >= 100) {
      Invoice.deleteMany({}, function(err, count) {
        if (err) {
          console.log(err);
        } else {
          console.log("Too many users, deleting all invoices before all users");
          User.deleteMany({}, function(err, count) {
            if (err) {
              console.log(err);
            } else {
              console.log("Too many users, reset user database");
            }
          });
        }
      });
    }
  });

  // Register new user
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