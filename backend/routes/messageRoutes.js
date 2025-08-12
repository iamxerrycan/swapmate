// routes/messageRoutes.js (example)
const express = require('express');
const router = express.Router();
const Message = require('../models/messageModel');

router.post('/', async (req, res) => {
  const { chatId, sender, receiver, content } = req.body;

  if (!chatId || !sender || !receiver || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const message = new Message({ chatId, sender, receiver, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;


