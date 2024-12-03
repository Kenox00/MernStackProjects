// controllers/authController.js
const Shopkeeper = require('../models/shopkeeper');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  const { username, password } = req.body;
  const shopkeeper = await Shopkeeper.findOne({ username });

  if (shopkeeper && (await shopkeeper.matchPassword(password))) {
    res.json({
      shopkeeperId: shopkeeper.shopkeeperId,
      username: shopkeeper.username,
      token: generateToken(shopkeeper.shopkeeperId),
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
};

const signup = async (req, res) => {
  const { username, password } = req.body;
  const shopkeeperExists = await Shopkeeper.findOne({ username });

  if (shopkeeperExists) {
    res.status(400);
    throw new Error('Shopkeeper already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const shopkeeper = await Shopkeeper.create({
    username,
    password: hashedPassword,
  });

  if (shopkeeper) {
    res.json({
      shopkeeperId: shopkeeper.shopkeeperId,
      username: shopkeeper.username,
      token: generateToken(shopkeeper.shopkeeperId),
    });
  } else {
    res.status(400);
    throw new Error('Invalid shopkeeper data');
  }
};

module.exports = { login, signup };
