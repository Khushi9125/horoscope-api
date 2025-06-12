// routes/horoscope.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mockHoroscopes = require('../utils/mockHoroscopes');

const userHistory = {}; // In-memory store for demo

// GET /horoscope/today
router.get('/today', async (req, res) => {
  try {
    const userId = req.user.userId; // from verifyToken
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const zodiac = user.zodiacSign;
    const today = new Date().toISOString().split('T')[0];

    const horoscope = mockHoroscopes[zodiac] || "No horoscope available";

    // Store in userHistory for /history (for demo only)
    if (!userHistory[userId]) userHistory[userId] = [];
    userHistory[userId].unshift({ date: today, zodiac, horoscope });
    userHistory[userId] = userHistory[userId].slice(0, 7); // limit to last 7

    res.json({ date: today, zodiac, horoscope });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /horoscope/history
router.get('/history', async (req, res) => {
  try {
    const userId = req.user.userId;
    const history = userHistory[userId] || [];
    res.json({ history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
