const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/messageModel');

// Get all chats for current user
router.get('/', async (req, res) => {
  const currentUserId = req.query.userId; // ya req.user._id if auth middleware hai
  if (!currentUserId) return res.status(400).json({ error: 'userId missing' });

  try {
    const chats = await Chat.find({ participants: currentUserId })
      .populate('participants', 'name')
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chats' });
  }
});

router.get('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chatId })
      .populate('sender', 'name')
      .populate('receiver', 'name')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/chat/start
router.post('/start', async (req, res) => {
  const { fromUserId, toUserId, swapId } = req.body;
  // consol.log('🔥 Incoming POST /api/chat/start');

  if (!fromUserId || !toUserId) {
    return res.status(400).json({ error: 'User IDs required' });
  }

  try {
    let chat = await Chat.findOne({
      participants: { $all: [fromUserId, toUserId] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [fromUserId, toUserId],
        swapId: swapId || null,
      });
      await chat.save();
    }

    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


