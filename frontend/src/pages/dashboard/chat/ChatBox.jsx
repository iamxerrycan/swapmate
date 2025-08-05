// src/pages/dashboard/chat/ChatBox.jsx

import React, { useState } from 'react';
import MessageItem from './MessageItem';
import './ChatBox.css';

const ChatBox = () => {
  const [messages] = useState([
    { id: 1, sender: 'admin', text: 'Welcome to Premium Chat!' },
    { id: 2, sender: 'user', text: 'Hi! I need some help.' },
  ]);
  const [input, setInput] = useState('');

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h3>Live Chat Support</h3>
        <span className="online-indicator">● Online</span>
      </div>

      <div className="chatbox-messages">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>

      <div className="chatbox-input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;
