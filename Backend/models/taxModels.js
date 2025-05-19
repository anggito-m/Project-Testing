const mongoose = require("mongoose");

const taxSchema = new mongoose.Schema({
  reference_number: { type: String, required: true, unique: true },
  tax_type: { type: String, required: true },
  taxAmount: { type: Number, required: true, min: 1 },
  submitted_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("TaxForm", taxSchema);