
// backend/controllers/stockController.js
const Stock = require('../models/Stock');
const Product = require('../models/Product');

exports.stockIn = async (req, res) => {
  try {
    const { productId, quantity, notes } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const stock = await Stock.create({
      product: productId,
      type: 'in',
      quantity,
      notes,
      updatedBy: req.user._id
    });

    product.quantity += quantity;
    await product.save();

    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.stockOut = async (req, res) => {
  try {
    const { productId, quantity, notes } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    const stock = await Stock.create({
      product: productId,
      type: 'out',
      quantity,
      notes,
      updatedBy: req.user._id
    });

    product.quantity -= quantity;
    await product.save();

    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
