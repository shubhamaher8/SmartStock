// routes/supplierRoutes.js
const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Add Supplier
router.post('/add', async (req, res) => {
  try {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Supplier
router.put('/:id', async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    if (!updatedSupplier) return res.status(404).json({ error: 'Supplier not found' });
    res.status(200).json(updatedSupplier);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Supplier
router.delete('/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
