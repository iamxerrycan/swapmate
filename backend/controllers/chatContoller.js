// controllers/chatController.js
const Chat = require('../models/Chat');
const Message = require('../models/messageModel');

exports.getChats = async (req, res) => {
  const currentUserId = req.query.userId;
  if (!currentUserId) return res.status(400).json({ error: 'userId missing' });

  try {
    const chats = await Chat.find({ participants: currentUserId })
      .populate('participants', 'name avatar')
      .sort({ updatedAt: -1 });

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
};

exports.getMessages = async (req, res) => {
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
};

exports.startChat = async (req, res) => {
  const { fromUserId, toUserId, swapId } = req.body;

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
};

exports.getUnreadCount = async (req, res) => {
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
};
