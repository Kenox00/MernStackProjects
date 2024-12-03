// models/shopkeeper.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const shopkeeperSchema = mongoose.Schema({
  shopkeeperId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

shopkeeperSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

shopkeeperSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Shopkeeper = mongoose.model('Shopkeeper', shopkeeperSchema);
module.exports = Shopkeeper;