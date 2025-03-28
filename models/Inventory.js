const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  stock: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema);

// const mongoose = require('mongoose');

// const inventorySchema = new mongoose.Schema({
//   product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   quantityAvailable: { type: Number, required: true },
//   location: { type: String }, // e.g., warehouse or store name
//   restockThreshold: { type: Number, default: 10 },
// }, { timestamps: true });

// module.exports = mongoose.model('Inventory', inventorySchema);