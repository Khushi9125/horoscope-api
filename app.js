// app.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth'); //signup/login
const horoscopeRoutes = require('./routes/horoscope'); //today/history — protected routes
const rateLimit = require('./middleware/rateLimit');
const setupSwagger = require('./config/swagger');
const { verifyToken } = require('./middleware/auth');

dotenv.config();
const app = express();

setupSwagger(app);
app.use(express.json());
app.use(rateLimit);

// Routes
app.use('/auth', authRoutes);
app.use('/horoscope', verifyToken, horoscopeRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  app.listen(3000, () => {
    console.log('🚀 Server started on http://localhost:3000');
  });
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});
