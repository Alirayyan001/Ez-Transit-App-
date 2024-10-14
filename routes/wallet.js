const express = require('express');
const verifyToken = require('../middleware/auth');
const Wallet = require('../models/Wallet');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.id });
    if (!wallet) {
      return res.status(404).json({ msg: 'Wallet not found' });
    }
    res.json({ balance: wallet.balance });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
