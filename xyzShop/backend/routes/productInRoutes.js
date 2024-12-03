// routes/productInRoutes.js
const express = require('express');
const router = express.Router();
const {
  recordProductIn,
  getStockInReport,
} = require('../controllers/productInController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, recordProductIn)
  .get(protect, getStockInReport);

module.exports = router;