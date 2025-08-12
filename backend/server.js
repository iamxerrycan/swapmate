const express = require('express');
const env = require('dotenv');
const connectDB = require('./config/db');
const routes = require('./routes/allRoutes');
const socketIo = require('socket.io');
const cors = require('cors');
const http = require('http');

// Load environment variables
env.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

// Allowed origins array (add your frontend URLs here)
const allowedOrigins = [
  'http://localhost:5173',
  'https://swapmate.netlify.app',
];

// CORS Middleware (Keep this before routes & body-parser)
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

// Socket.io setup
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Test Route (Optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
