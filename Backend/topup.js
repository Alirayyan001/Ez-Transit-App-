// routes/topup.js
const express = require('express');
const verifyToken = require('../middleware/auth');
const { topUp, getTopupHistory } = require('../controllers/topupController');

const router = express.Router();

// Route to create a top-up request
router.post('/', verifyToken, topUp);

// Route to get user's top-up history
router.get('/history', verifyToken, getTopupHistory);

module.exports = router;
