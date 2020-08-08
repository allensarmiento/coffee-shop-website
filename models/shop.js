const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  blend: String,
  name: String,
  price: String,
  image: String
});

module.exports = mongoose.model("Shop", shopSchema, "Shop"); 
