const express = require('express');
const router = express.Router();
const SalesReport = require('../models/SalesReport');

// Create a report
router.post('/', async (req, res) => {
  try {
    const { reportPeriod, totalRevenue, totalSales, bestSellingProduct } = req.body;
    const report = new SalesReport({ reportPeriod, totalRevenue, totalSales, bestSellingProduct });
    await report.save();
    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all reports
router.get('/', async (req, res) => {
  try {
    const reports = await SalesReport.find().populate('bestSellingProduct');
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
