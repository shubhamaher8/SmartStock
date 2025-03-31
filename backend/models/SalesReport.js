const mongoose = require('mongoose');

const salesReportSchema = new mongoose.Schema({
  reportPeriod: { type: String, required: true }, // e.g., "March 2025"
  totalRevenue: { type: Number, required: true },
  totalSales: { type: Number, required: true },
  bestSellingProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
}, { timestamps: true });

module.exports = mongoose.model('SalesReport', salesReportSchema);
