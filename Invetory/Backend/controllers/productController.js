const Product = require('../models/product');
const Category = require('../models/category');

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

    // Log the product to debug
    console.log('Product before stock update:', product);

    // Validate the category (optional, for debugging purposes)
    if (!product.category) {
      return res.status(400).json({ error: 'Product is missing a category. Please update the product.' });
    }

    // Update stock
    product.stock += parseInt(stock, 10);
    await product.save();

    res.json({ message: 'Stock increased successfully.', product });
  } catch (err) {
    console.error('Stock-in error:', err);
    res.status(500).json({ error: 'Internal server error.', details: err.message });
  }
};


exports.stockOut = async (req, res) => {
  const { stock } = req.body;
  const productId = req.params.id;

  if (!stock || stock <= 0) {
    return res.status(400).json({ error: 'Quantity must be a positive number.' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Log the product to debug
    console.log('Product before stock update:', product);

    // Validate the category (optional, for debugging purposes)
    if (!product.category) {
      return res.status(400).json({ error: 'Product is missing a category. Please update the product.' });
    }

    // Check for sufficient stock
    if (product.stock < stock) {
      return res.status(400).json({ error: `Insufficient stock. Available stock: ${product.stock}` });
    }

    // Reduce stock
    product.stock -= parseInt(stock, 10);
    await product.save();

    res.json({ message: 'Stock reduced successfully.', product });
  } catch (err) {
    console.error('Stock-out error:', err);
    res.status(500).json({ error: 'Internal server error.', details: err.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  const { name, stock, category } = req.body;

  if (!name || stock === undefined || !category) {
    return res.status(400).json({ error: 'Name, stock, and category are required.' });
  }

  try {
    const existingCategory = await Category.findOne({ name: category });
    if (!existingCategory) {
      return res.status(400).json({ error: `Category '${category}' does not exist.` });
    }
    
    // Create the product with the category name
    const product = new Product({ name, stock, category: existingCategory.name });
    await product.save();
    
    res.status(201).json({ message: 'Product created successfully.', product });
  } catch (err) {
    res.status(500).json({ error: 'Error creating product.', details: err.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // No need to populate since category is stored by name
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
  const { name, stock, category } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found.' });

    // Update product fields
    if (name) product.name = name;
    if (stock !== undefined) product.stock = stock;

    if (category) {
      // Check if the new category exists by its name
      const existingCategory = await Category.findOne({ name: category });
      if (!existingCategory) {
        return res.status(400).json({ error: `Category '${category}' does not exist.` });
      }
      product.category = existingCategory.name;
    }

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

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  const category = req.params.category;
  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products by category.', details: err.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching categories.', details: err.message });
  }
};
// create category 
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required.' });
  }
  try {
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category created successfully.', category });
  } catch (err) {
    res.status(500).json({ error: 'Error creating category.', details: err.message });
  }
};