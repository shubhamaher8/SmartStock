// models/Product.js
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  ProductName:     { type: String, required: true },
  Category:        { type: String, required: true },
  Price:           { type: Number, required: true },
  StockQuantity:   { type: Number, required: true },
  SupplierID:      { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  AddedDate:       { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema);
