// routes/inventoryRoutes.js
const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Add Inventory Entry
router.post('/add', async (req, res) => {
  try {
    const inventory = new Inventory(req.body);
    await inventory.save();
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('ProductID');
    res.status(200).json(inventory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Low Stock Items
router.get('/low-stock', async (req, res) => {
  try {
    const lowStockItems = await Inventory.find({ StockQuantity: { $lt: 10 } });
    res.status(200).json(lowStockItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Inventory
router.put('/:id', async (req, res) => {
  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedInventory) return res.status(404).json({ error: 'Inventory not found' });
    res.status(200).json(updatedInventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
