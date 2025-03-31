const mongoose = require('mongoose');

const inventoryForecastSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  forecastDate: { type: Date, required: true },
  expectedDemand: { type: Number, required: true },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('InventoryForecast', inventoryForecastSchema);
