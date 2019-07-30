const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
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
      image: String,
      price: String,
      quantity: String
    }
  ]
});

module.exports = mongoose.model("Invoice", InvoiceSchema, "Invoice");