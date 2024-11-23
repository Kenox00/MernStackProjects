// File: controllers/productController.js
const Product = require('../models/product');

// Add Stock
exports.stockIn = async (req, res) => {
  const { stock } = req.body;
  const productId = req.params.id;
  if (!stock || stock <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    product.stock += stock;
    await product.save();
    res.json({ message: 'Stock increased successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Reduce Stock
exports.stockOut = async (req, res) => {
  const { stock } = req.body;
  const productId = req.params.id;
  if (!stock || stock <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    if (product.stock < stock) {
      return res.status(400).json({ error: 'Insufficient stock.' });
    }

    product.stock -= stock;
    await product.save();
    res.json({ message: 'Stock reduced successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, stock } = req.body;

  if (!name || stock === undefined) {
    return res.status(400).json({ error: 'Name and stock are required.' });
  }

  try {
    const product = new Product({ name, stock });
    await product.save();
    res.status(201).json({ message: 'Product created successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Error creating product.', details: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products.', details: err.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product.', details: err.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { name, stock } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    // Update product fields
    if (name) product.name = name;
    if (stock !== undefined) product.stock = stock;

    await product.save();
    res.json({ message: 'Product updated successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Error updating product.', details: err.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    res.json({ message: 'Product deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting product.', details: err.message });
  }
};
