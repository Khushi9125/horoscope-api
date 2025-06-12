const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mockHoroscopes = require('../utils/mockHoroscopes');

const userHistory = {}; // In-memory store for demo

/**
 * @swagger
 * tags:
 *   name: Horoscope
 *   description: Fetch daily and historical horoscopes
 */

/**
 * @swagger
 * /horoscope/today:
 *   get:
 *     summary: Get today’s horoscope based on user’s zodiac sign
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved today's horoscope
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   example: "2025-06-13"
 *                 zodiac:
 *                   type: string
 *                   example: "Gemini"
 *                 horoscope:
 *                   type: string
 *                   example: "Your curiosity will lead to great insights."
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /horoscope/history:
 *   get:
 *     summary: Get the last 7 days of horoscope history
 *     tags: [Horoscope]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved history
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 history:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                         example: "2025-06-13"
 *                       zodiac:
 *                         type: string
 *                         example: "Gemini"
 *                       horoscope:
 *                         type: string
 *                         example: "Your curiosity will lead to great insights."
 *       401:
 *         description: Unauthorized (missing or invalid token)
 *       500:
 *         description: Internal server error
 */
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
