// models/SalesReport.js
const mongoose = require('mongoose');

const SalesReportSchema = new mongoose.Schema({
  ReportDate:         { type: Date, default: Date.now },
  TotalSales:         { type: Number, required: true },
  TotalRevenue:       { type: Number, required: true },
  BestSellingProduct: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  LeastSellingProduct:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});

module.exports = mongoose.model('SalesReport', SalesReportSchema);
