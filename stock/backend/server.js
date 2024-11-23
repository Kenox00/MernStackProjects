// File: server.js
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
// Enable CORS
app.use(cors());
// Middleware
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
