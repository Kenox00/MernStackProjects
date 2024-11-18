// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  quantity: { type: Number, required: true, default: 0 },
  minQuantity: { type: Number, default: 0 },
  unit: String,
  category: String,
  price: { type: Number, required: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;