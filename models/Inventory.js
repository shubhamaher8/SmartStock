// models/Inventory.js
const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  ProductID:        { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  StockQuantity:    { type: Number, required: true },
  ReorderLevel:     { type: Number, required: true },
  WarehouseLocation:{ type: String, required: true },
  LastUpdated:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema);
