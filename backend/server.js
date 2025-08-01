const express = require('express');
const env = require('dotenv');
const connectDB = require('./config/db');
// const routes = require('./routes/allRoutes');
const routes = require('./routes/allRoutes');
const app = express();
const cors = require('cors');

app.use(
  cors({
    // origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    origin: [
      'http://localhost:5173',
      "https://swapmate.netlify.app", 
    ], 
    credentials: true,
  })
);

env.config();
connectDB();

//  Correct order of middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//  Routes after body parser
app.use('/api', routes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
