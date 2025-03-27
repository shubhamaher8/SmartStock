// models/Sale.js
const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  ProductID:     { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  SaleDate:      { type: Date, default: Date.now },
  QuantitySold:  { type: Number, required: true },
  TotalRevenue:  { type: Number, required: true }
});

module.exports = mongoose.model('Sale', SaleSchema);
