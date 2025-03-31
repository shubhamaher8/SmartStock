const mongoose = require('mongoose');

const productStatisticsSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  totalSales: { type: Number, default: 0 },
  totalRevenue: { type: Number, default: 0 },
  lastSoldDate: { type: Date },
  views: { type: Number, default: 0 }, // If tracking engagement
}, { timestamps: true });

module.exports = mongoose.model('ProductStatistics', productStatisticsSchema);
