// Seeds the database. 
//
// This seeds the entire database so that the website starts with no users
// and no invoices.

var mongoose = require("mongoose");
var Shop = require("./models/shop");
var Stores = require("./models/stores");
var Invoice = require("./models/invoice");
var User = require("./models/user");

var items = [
  {blend: "Dark", name: "Dark Expresso", price: "8.99", image: "https://cdn.shopify.com/s/files/1/0002/1115/7052/products/brazil1_dkroast_400.jpg?v=1549596309"},
  {blend: "Dark", name: "Haitian", price: "7.99", image: "https://www.holybeanscafe.com/holybeanscafe/wp-content/uploads/2015/11/dark-roast-coffee.jpg"},
  {blend: "Dark", name: "Paris", price: "7.99", image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1912&q=80"},
  {blend: "Dark", name: "Mocha Java", price: "6.99", image: "https://sep.yimg.com/ay/yhst-133788258843600/mocha-java-organic-coffee-beans-41.gif"},
  
  {blend: "Medium", name: "Medium Expresso", price: "7.99", image: "https://www.coffeebeandirect.com/media/catalog/product/cache/1/image/0dc6da5b2fe15547a809e30525508fd7/m/e/medium-roast-espresso-wide.jpg"},
  {blend: "Medium", name: "Coffee Club", price: "8.99", image: "https://static1.squarespace.com/static/59d9113c90bade192af3e3a0/t/5a2dc13b53450ab787d59f99/1512948028366/food-beans-coffee-drink.jpg"},
  {blend: "Medium", name: "Colombia", price: "7.99", image: "http://www.topratedcoffeebeans.com/wp-content/uploads/2014/11/Vienna-roast-beans-300x300.png"},
  
  {blend: "Light", name: "House Blend", price: "8.99", image: "https://www.coffeebeandirect.com/media/catalog/product/cache/1/image/0dc6da5b2fe15547a809e30525508fd7/l/i/light-house-blend-wide.jpg"},
  {blend: "Light", name: "Colombian Supremo", price: "8.99", image: "https://www.coffeebeandirect.com/media/catalog/product/cache/1/image/0dc6da5b2fe15547a809e30525508fd7/c/o/colombian-supremo-wide.jpg"},

  {blend: "Decaf", name: "Brazilian", price: "7.99", image: "https://www.azorieblue.co.uk/wp-content/uploads/2017/04/whole-coffee-beans.png"},
  {blend: "Decaf", name: "Costa Rica", price: "8.99", image: "https://www.friedrichscoffee.com/wp-content/uploads/2018/03/Decaf-Costa-Rica-Vienna.jpg"},
  {blend: "Decaf", name: "Cinnamon Pecan", price: "6.99", image: "https://i0.wp.com/ottosgranary.com/wp-content/uploads/2019/04/Decaf-Cinnamon-Pecan-Praline-Coffee-Beans.jpg?fit=600%2C600&ssl=1"}
];

var stores = [
  {city: "San Francisco", street: "Golden Gate", bgImage: "https://images.unsplash.com/photo-1487132906645-8e0fbba067e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
  {city: "San Francisco", street: "Mission District", bgImage: "https://images.unsplash.com/photo-1439396087961-98bc12c21176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1780&q=80"},
  {city: "San Francisco", street: "Midtown Terrace", bgImage: "https://images.unsplash.com/photo-1445359179985-460648949e10?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"},
  {city: "San Francisco", street: "University Mound", bgImage: "https://images.unsplash.com/photo-1458169495136-854e4c39548a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  
  {city: "Los Angeles", street: "Chinatown", bgImage: "https://images.unsplash.com/photo-1521123493239-e0f9ae0445ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},
  {city: "Los Angeles", street: "Fashion District", bgImage: "https://images.unsplash.com/photo-1557882518-693670985a99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"},
  {city: "Los Angeles", street: "Rampart Village", bgImage: "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"},

  {city: "New York", street: "East Village", bgImage: "https://images.unsplash.com/photo-1512486046-0d05000458ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1334&q=80"},
  {city: "New York", street: "Brooklyn Heights", bgImage: "https://images.unsplash.com/photo-1484861671664-4ebd42ced711?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"},
  {city: "New York", street: "Greenpoint", bgImage: "https://images.unsplash.com/photo-1450705354661-932f7b21aa51?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"}
];

function seedDB() {
  // Remove shop items
  Shop.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed shop items");
    // Add shop items
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

  // Remove stores
  Stores.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed stores");
    // Add stores
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

  // Remove invoices
  Invoice.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed invoices");
  });

  // Remove users
  User.deleteMany({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log("removed users");
  })
}

module.exports = seedDB;