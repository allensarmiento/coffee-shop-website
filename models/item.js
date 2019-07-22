var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
  name: String,
  price: String
});

module.exports = mongoose.model("Item", ItemSchema, "Item");