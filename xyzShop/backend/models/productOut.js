// models/productOut.js
const mongoose = require('mongoose');

const productOutSchema = mongoose.Schema({
  productCode: {
    type: String,
    required: true,
    ref: 'Product'
  },
  dateTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const ProductOut = mongoose.model('ProductOut', productOutSchema);
module.exports = ProductOut;