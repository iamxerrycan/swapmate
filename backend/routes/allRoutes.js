const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const itemRoutes = require('./itemRoutes');
const adminRoutes = require('./adminRoutes');
const userRoutes = require('./userRoutes');
const swapRoutes = require('./swapRoutes');
const notificationRoutes = require('./notificationRoutes');
const activityRoutes = require('./activityRoutes');
const chatRoutes = require('./chatRoutes');
const messageRoutes = require('./messageRoutes');

//chat routes
router.use('/chat', chatRoutes);
router.use('/messages', messageRoutes);
// Prefix each route group
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/swaps', swapRoutes);
router.use('/notifications', notificationRoutes);
router.use('/activities', activityRoutes);

module.exports = router;





