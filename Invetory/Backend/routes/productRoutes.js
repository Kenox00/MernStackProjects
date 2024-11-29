// File: routes/productRoutes.js
const express = require("express");
const authenticate = require("../middleware/authMiddleware");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  stockIn,
  stockOut,
  createCategory,
  getProductsByCategory,
  getAllCategories,
} = require("../controllers/productController");

// CRUD Routes for Product
router.post("/", authenticate, createProduct); 
router.get("/", authenticate,  getProducts); 
router.get("/:id", authenticate,  getProductById); 
router.get("/:category", authenticate, getProductsByCategory ); 
router.put("/:id", authenticate,  updateProduct); 
router.delete("/:id",  authenticate, deleteProduct);

// Stock Routes
router.post("/:id/stock-in", authenticate, stockIn);
router.post("/:id/stock-out",authenticate,  stockOut);


module.exports = router;
