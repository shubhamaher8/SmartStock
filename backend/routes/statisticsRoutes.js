const express = require('express');
const router = express.Router();
const ProductStatistics = require('../models/ProductStatistics');

// Create or update stats for a product
router.post('/', async (req, res) => {
  try {
    const { product, totalSales, totalRevenue, lastSoldDate, views } = req.body;
    let stats = await ProductStatistics.findOne({ product });
    if (stats) {
      stats.totalSales += totalSales;
      stats.totalRevenue += totalRevenue;
      stats.lastSoldDate = lastSoldDate || stats.lastSoldDate;
      stats.views += views || 0;
      await stats.save();
    } else {
      stats = new ProductStatistics({ product, totalSales, totalRevenue, lastSoldDate, views });
      await stats.save();
    }
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all product statistics
router.get('/', async (req, res) => {
  try {
    const stats = await ProductStatistics.find().populate('product');
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
