var mongoose = require("mongoose");

var InvoiceSchema = new mongoose.Schema({
  customer: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  items: [
    {
      name: String,
      price: String,
      image: String,
      quantity: String
    }
  ]
});

module.exports = mongoose.model("Invoice", InvoiceSchema, "Invoice");