// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  ProductID:        { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  OrderDate:        { type: Date, default: Date.now },
  QuantityOrdered:  { type: Number, required: true },
  TotalAmount:      { type: Number, required: true },
  Status:           { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' }
});

module.exports = mongoose.model('Order', OrderSchema);
