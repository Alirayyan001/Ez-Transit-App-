const express = require('express');
const { register, login } = require('../controllers/authController'); // Ensure correct path and function names
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;
