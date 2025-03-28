const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Add a new supplier
router.post('/', async (req, res) => {
  try {
    const { name, contactInfo, productsSupplied } = req.body;
    const supplier = new Supplier({ name, contactInfo, productsSupplied });
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find().populate('productsSupplied');
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
