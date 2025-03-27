// server.js
const express = require('express');
const app = express();
const connectDB = require('./config/db');


// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');

// Load environment variables
// dotenv.config();
//body parser
app.use(express.json());
// Connect to MongoDB
connectDB();
const PORT = 3000;
// Middleware
// app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => 
{
  res.send('Hello World!');
});
// Routes
// app.use('/users', require('./routes/userRoutes'));        // Optional, for authentication
// app.use('/products', require('./routes/productRoutes'));
// app.use('/inventory', require('./routes/inventoryRoutes'));
// app.use('/orders', require('./routes/orderRoutes'));
// app.use('/sales', require('./routes/saleRoutes'));
// app.use('/suppliers', require('./routes/supplierRoutes'));
// Add more if needed (e.g., productStatistics, inventoryForecast, etc.)

// Server listen
// const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SmartStock backend running on port ${PORT}`);
});
