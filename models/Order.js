const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' },
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customerName: { type: String, required: true },
//   products: [
//     {
//       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//       quantity: { type: Number, required: true }
//     }
//   ],
//   totalAmount: { type: Number, required: true },
//   status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
//   orderDate: { type: Date, default: Date.now },
// }, { timestamps: true });

// module.exports = mongoose.model('Order', orderSchema);
