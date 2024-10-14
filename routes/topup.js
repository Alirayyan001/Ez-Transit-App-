// routes/topup.js
const express = require('express');
const verifyToken = require('../middleware/auth');
const { topUp } = require('../controllers/topupController');

const router = express.Router();

router.post('/', verifyToken, topUp);

module.exports = router;
