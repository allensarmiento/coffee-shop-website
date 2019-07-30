const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const Stores = require("../models/stores");

router.get("/", function(req, res) {
  res.render("home");
});

router.get("/shop", function(req, res) {
  Shop.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("shop", {items: items});
    }
  })
});

router.get("/stores", function(req, res) {
  Stores.find({}, function(err, stores) {
    if (err) {
      console.log(err);
    } else {
      res.render("stores", {stores: stores});
    }
  })
});

router.get("/story", function(req, res) {
  res.render("story");
});

router.get("/joinUs", function(req, res) {
  res.render("joinUs");
});

module.exports = router;