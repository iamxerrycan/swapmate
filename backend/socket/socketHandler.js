// socket/socketHandler.js
const Message = require('../models/Message');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinChat', (chatId) => {
      socket.join(chatId);
      console.log(`User joined chat ${chatId}`);
    });

    socket.on('sendMessage', async (data) => {
      try {
        // Save message to DB
        const newMsg = new Message({
          chatId: data.chatId,
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
        });
        await newMsg.save();

        // Emit to users in the same chat room
        io.to(data.chatId).emit('receiveMessage', newMsg);
      } catch (err) {
        console.error('Error saving message:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
