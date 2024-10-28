// models/qrCodeModel.js

const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
  stationID: {
    type: String,
    required: true,
    unique: true
  },
  stationName: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['entry', 'exit'],
    required: true
  },
  qrCodeImage: {
    type: String,  // Path to the image file
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('QrCode', qrCodeSchema);
