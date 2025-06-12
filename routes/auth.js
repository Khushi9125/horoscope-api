// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { getZodiacSign } = require('../utils/zodiac');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, birthdate } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Get zodiac sign from birthdate
    const zodiacSign = getZodiacSign(new Date(birthdate));

    const user = new User({ name, email, password, birthdate, zodiacSign });
    await user.save();

    res.status(201).json({ message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
