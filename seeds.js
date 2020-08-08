const mongoose = require("mongoose");
const Shop = require("./models/shop");
const Stores = require("./models/stores");
const Invoice = require("./models/invoice");
const User = require("./models/user");
const constants = require("./constants");

const items = constants.items;
const stores = constants.stores;

function seedDB() {
  Shop.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed shop items");
    items.forEach(function(item) {
      Shop.create(item, function(err, shop) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a shop item");
        }
      });
    });
  });

  Stores.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed stores");
    stores.forEach(function(store) {
      Stores.create(store, function(err, stores) {
        if (err) {
          console.log(err);
        } else {
          console.log("Added a store");
        }
      });
    });
  });

  Invoice.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed invoices");
  });

  User.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed users");
  })
}

module.exports = seedDB;
