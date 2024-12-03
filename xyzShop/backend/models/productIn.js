// models/productIn.js
const mongoose = require('mongoose');

const productInSchema = mongoose.Schema({
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

const ProductIn = mongoose.model('ProductIn', productInSchema);
module.exports = ProductIn;