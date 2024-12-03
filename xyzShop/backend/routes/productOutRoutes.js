// routes/productOutRoutes.js
const express = require('express');
const router = express.Router();
const {
  recordProductOut,
  getStockOutReport,
} = require('../controllers/productOutController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, recordProductOut)
  .get(protect, getStockOutReport);

module.exports = router;