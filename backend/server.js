const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get('/', (req, res) => {
  res.send('SmartStock API is running...');
});

// Routes
app.use('/users', require('./routes/userRoutes'));
app.use('/products', require('./routes/productRoutes'));
app.use('/inventory', require('./routes/inventoryRoutes'));
app.use('/orders', require('./routes/orderRoutes'));
app.use('/sales', require('./routes/saleRoutes'));
app.use('/sales-report', require('./routes/salesReportRoutes'));
app.use('/suppliers', require('./routes/supplierRoutes'));
app.use('/statistics', require('./routes/statisticsRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`SmartStock backend running on port ${PORT}`);
});
