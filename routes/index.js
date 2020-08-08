const express = require("express");
const router = express.Router();
const Shop = require("../models/shop");
const Stores = require("../models/stores");
const constants = require("../constants");

router.get("/", function(req, res) {
  res.render("home", { home: constants.home });
});

router.get("/shop", function(req, res) {
  Shop.find({}, function(err, items) {
    if (err) {
      console.log(err);
    } else {
      res.render("shop", { shop: constants.shop, items: items });
    }
  })
});

router.get("/stores", function(req, res) {
  Stores.find({}, function(err, stores) {
    if (err) {
      console.log(err);
    } else {
      res.render("stores", { store: constants.store, stores: stores });
    }
  })
});

router.get("/story", function(req, res) {
  res.render("story", { story: constants.story });
});

router.get("/joinUs", function(req, res) {
  res.render("joinUs", { joinUs: constants.joinUs });
});

module.exports = router;