// src/pages/dashboard/chat/MessageItem.jsx
import React from 'react';
import './MessageItem.css';

const MessageItem = ({ message }) => {
  const isUser = message.sender.toLowerCase() === 'user';

  return (
    <div className={`message-item ${isUser ? 'message-user' : 'message-admin'}`}>
      <div className="message-bubble">{message.text}</div>
    </div>
  );
};

export default MessageItem;
