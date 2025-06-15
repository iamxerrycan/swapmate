const express = require('express');
const env = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/allRoutes');
const app = express();

env.config();
connectDB();

//  Correct order of middleware
app.use(express.json()); // Parse JSON body first
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
