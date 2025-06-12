// middleware/rateLimit.js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,              // limit each IP to 5 requests per minute
  message: {
    error: "⏳ Too many requests. Please try again after a minute.",
  },
});

module.exports = limiter;
