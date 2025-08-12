// controllers/messageController.js
const Message = require('../models/messageModel');

exports.sendMessage = async (req, res) => {
  const { chatId, sender, receiver, content } = req.body;

  if (!chatId || !sender || !receiver || !content) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const message = new Message({
      chatId,
      sender,
      receiver,
      content,
      readBy: [sender],
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

exports.markMessagesRead = async (req, res) => {
  const { chatId } = req.params;
  const userId = req.body.userId;

  if (!userId) return res.status(400).json({ error: 'userId required' });

  try {
    await Message.updateMany(
      { chatId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );
    res.json({ message: 'Messages marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update read status' });
  }
};
