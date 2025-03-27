// models/ProductStatistics.js
const mongoose = require('mongoose');

const ProductStatisticsSchema = new mongoose.Schema({
  ProductID:          { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  TotalSales:         { type: Number, default: 0 },
  TotalRevenue:       { type: Number, default: 0 },
  AveragePrice:       { type: Number, default: 0 },
  StockTurnoverRate:  { type: Number, default: 0 },
  LastUpdated:        { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductStatistics', ProductStatisticsSchema);
