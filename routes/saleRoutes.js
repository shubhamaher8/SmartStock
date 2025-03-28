const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Create a sale
router.post('/', async (req, res) => {
  try {
    const { product, quantitySold, totalRevenue } = req.body;
    const sale = new Sale({ product, quantitySold, totalRevenue });
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('product');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
