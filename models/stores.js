const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  city: String,
  street: String, 
  bgImage: String
});

module.exports = mongoose.model("Stores", storeSchema, "Stores");