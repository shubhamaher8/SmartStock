const mongoose = require('mongoose');

const InventoryForecastSchema = new mongoose.Schema({
    ProductID: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    PredictedSales: { type: Number, required: true },
    ReorderRecommendation: { type: String, required: true }
});

module.exports = mongoose.model('InventoryForecast', InventoryForecastSchema);
