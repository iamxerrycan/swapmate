const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const Message = require('../models/messageModel');

// Get all chats for current user
router.get('/', async (req, res) => {
  const currentUserId = req.query.userId; // Or from req.user._id if auth middleware is used
  if (!currentUserId) return res.status(400).json({ error: 'userId missing' });

  try {
    const chats = await Chat.find({ participants: currentUserId })
      .populate('participants', 'name avatar') // add avatar if available
      .sort({ updatedAt: -1 });

    // Add unreadCount for each chat
    const chatsWithUnread = await Promise.all(
      chats.map(async (chat) => {
        const unreadCount = await Message.countDocuments({
          chatId: chat._id,
          readBy: { $ne: currentUserId },
          sender: { $ne: currentUserId },
        });

        return { ...chat.toObject(), unreadCount };
      })
    );

    res.json(chatsWithUnread);
  } catch (error) {
    console.error('Error fetching chats:', error);
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

// Example: GET /api/chat/unread-count?userId=xxx
router.get('/unread-count', async (req, res) => {
  const currentUserId = req.query.userId;
  if (!currentUserId) return res.status(400).json({ error: 'userId missing' });

  try {
    const userChats = await Chat.find({ participants: currentUserId }).select(
      '_id'
    );
    const chatIds = userChats.map((chat) => chat._id);

    const totalUnread = await Message.countDocuments({
      chatId: { $in: chatIds },
      readBy: { $ne: currentUserId },
      sender: { $ne: currentUserId },
    });

    res.json({ totalUnread });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch total unread count' });
  }
});

module.exports = router;
