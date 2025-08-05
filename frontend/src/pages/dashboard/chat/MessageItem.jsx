// src/pages/dashboard/chat/MessageItem.jsx

import React from 'react';

const MessageItem = ({ message }) => {
  const isUser = message.sender === 'user'; // or use actual logic for sender check

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`p-2 rounded-lg max-w-xs ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageItem;
