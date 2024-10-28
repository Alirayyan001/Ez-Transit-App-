// routes/qrCodeRoutes.js
const express = require('express');
const router = express.Router();
const Wallet = require('../models/Wallet');
const QRCode = require('../models/qrCodeModel');
const verifyToken = require('../middleware/auth'); // Make sure user is authenticated

// Route to fetch QR code and deduct fare based on scanned data
// Route to fetch QR code and deduct fare based on scanned data
router.post('/deduct-fare', verifyToken, async (req, res) => {
    try {
      const { qrCodeData } = req.body; // Expecting "stationID|fare|type"
      const [stationName, fare, qrType] = qrCodeData.split('|'); // Parse data from qrCodeData
      
      // Find the QR code based on the station name to get the stationID
      const qrCode = await QRCode.findOne({ stationName }); // Change here to find by stationName
      if (!qrCode) {
        return res.status(404).json({ message: 'QR Code not found' });
      }
  
      const userId = req.user.id;
  
      // Find the user's wallet
      const wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }
  
      // Check if balance is enough
      const fareAmount = parseFloat(fare);
      if (wallet.balance < fareAmount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      // Deduct fare from wallet and save
      wallet.balance -= fareAmount;
      await wallet.save();
  
      res.status(200).json({ message: 'Fare deducted successfully', newBalance: wallet.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  

module.exports = router;
