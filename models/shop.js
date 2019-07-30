const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  blend: String,
  name: String,
  price: String,
  image: String
});

// NOTE: Mongoose by default add an S, so to prevent looking for Shops, specify to look for Shop as the 3rd parameter.
module.exports = mongoose.model("Shop", shopSchema, "Shop"); 
