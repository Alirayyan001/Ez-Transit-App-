// models/Wallet.js
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Each user should only have one wallet
  },
  balance: {
    type: Number,
    default: 10  // Initial amount when wallet is created
  }
});

module.exports = mongoose.model('Wallet', walletSchema);
