
// controllers/productInController.js
const ProductIn = require('../models/productIn');

// Record product in
const recordProductIn = async (req, res) => {
  const { productCode, quantity, unitPrice } = req.body;
  const totalPrice = quantity * unitPrice;

  const productIn = await ProductIn.create({
    productCode,
    quantity,
    unitPrice,
    totalPrice,
  });

  if (productIn) {
    res.status(201).json(productIn);
  } else {
    res.status(400);
    throw new Error('Invalid data');
  }
};

// Get stock-in report
const getStockInReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  
  const query = {};
  if (startDate && endDate) {
    query.dateTime = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const report = await ProductIn.find(query);
  const totalAmount = report.reduce((acc, curr) => acc + curr.totalPrice, 0);

  res.json({
    entries: report,
    totalAmount,
  });
};

module.exports = {
  recordProductIn,
  getStockInReport,
};