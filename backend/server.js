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


// CORS Middleware (Keep this before routes & body-parser)
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);

// Socket.io setup
const io = socketIo(server, {
  cors: { origin: [process.env.FRONTEND_URL], credentials: true },
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


