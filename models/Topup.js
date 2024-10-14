// models/Topup.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopupSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  accountType: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Topup', TopupSchema);
