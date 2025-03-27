// routes/saleRoutes.js
const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Record Sale
router.post('/add', async (req, res) => {
  try {
    const sale = new Sale(req.body);
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().populate('ProductID');
    res.status(200).json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Best-Selling Product
router.get('/best-selling', async (req, res) => {
  try {
    const bestSelling = await Sale.aggregate([
      { $group: { _id: '$ProductID', totalSold: { $sum: '$QuantitySold' } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);
    res.status(200).json(bestSelling);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
