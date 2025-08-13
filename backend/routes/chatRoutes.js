// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatContoller');

router.get('/', chatController.getChats);
router.get('/:chatId/messages', chatController.getMessages);
router.post('/start', chatController.startChat);
router.get('/unread-count', chatController.getUnreadCount);

module.exports = router;
