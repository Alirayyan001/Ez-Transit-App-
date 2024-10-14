// routes / Login.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @route   POST api/login
// @desc    Authenticate user & get token (for future use)
// @access  Public
router.post('/login', async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // If user exists and password matches, you can generate and send a token here
    // For simplicity, let's just send a success message for now
    res.json({ msg: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
