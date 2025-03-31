const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Add to inventory
router.post('/', async (req, res) => {
  try {
    const { product, stockQuantity, lowStockThreshold } = req.body;
    const inventory = new Inventory({ product, stockQuantity, lowStockThreshold });
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all inventory
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find().populate('product');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update stock quantity
router.put('/:id', async (req, res) => {
  try {
    const { stockQuantity } = req.body;
    const item = await Inventory.findByIdAndUpdate(
      req.params.id,
      { stockQuantity },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
