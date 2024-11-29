// File: models/product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  category: { type: String, required: true }, 
});

module.exports = mongoose.model('Product', productSchema);