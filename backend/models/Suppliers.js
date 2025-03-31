const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    SupplierName: { type: String, required: true },
    ContactPerson: { type: String, required: true },
    ContactNumber: { type: String, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true }
});

module.exports = mongoose.model('Supplier', SupplierSchema);
