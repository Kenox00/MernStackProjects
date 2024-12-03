// models/product.js
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    unique: true
  },
  productName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;