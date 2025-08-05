const express = require('express');
const env = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/allRoutes');
const cors = require('cors');

// Load environment variables
env.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS Middleware (✅ Keep this before routes & body-parser)
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://swapmate.netlify.app',
    ],
    credentials: true,
  })
);

// Body Parsers (✅ Required before using req.body)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (✅ Correctly mounted)
app.use('/api', routes);

// Test Route (Optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});

module.exports = app;
