// controllers/productOutController.js
const ProductOut = require('../models/productOut');

// Record product out
const recordProductOut = async (req, res) => {
  const { productCode, quantity, unitPrice } = req.body;
  const totalPrice = quantity * unitPrice;

  const productOut = await ProductOut.create({
    productCode,
    quantity,
    unitPrice,
    totalPrice,
  });

  if (productOut) {
    res.status(201).json(productOut);
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
};

// Get stock-out report
const getStockOutReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const query = {};
  if (startDate && endDate) {
    query.dateTime = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const report = await ProductOut.find(query);
  const totalAmount = report.reduce((acc, curr) => acc + curr.totalPrice, 0);

  res.json({
    entries: report,
    totalAmount,
  });
};

module.exports = {
  recordProductOut,
  getStockOutReport,
};