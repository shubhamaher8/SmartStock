const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantitySold: { type: Number, required: true },
  saleDate: { type: Date, default: Date.now },
  totalRevenue: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);
