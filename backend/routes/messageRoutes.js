// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/', messageController.sendMessage);
router.put('/read/:chatId', messageController.markMessagesRead);

module.exports = router;
