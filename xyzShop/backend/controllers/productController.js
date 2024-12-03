// controllers/productController.js
const Product = require('../models/product');

// Get all products
const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json(products);
};

// Create new product
const createProduct = async (req, res) => {
  const { productCode, productName } = req.body;
  const productExists = await Product.findOne({ productCode });

  if (productExists) {
    res.status(400);
    throw new Error('Product already exists');
  }

  const product = await Product.create({
    productCode,
    productName,
  });

  if (product) {
    res.status(201).json(product);
  } else {
    res.status(400);
    throw new Error('Invalid product data');
  }
};

// Update product
const updateProduct = async (req, res) => {
  const product = await Product.findOne({ productCode: req.params.productCode });

  if (product) {
    product.productName = req.body.productName || product.productName;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ productCode: req.params.productCode });

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};