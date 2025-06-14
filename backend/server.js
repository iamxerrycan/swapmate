const express = require('express');
const env = require('dotenv');
const connectDB = require('./config/db');
const app = express();
env.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes

// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// Export the app for testing

module.exports = app;
