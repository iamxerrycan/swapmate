// src/pages/dashboard/chat/ChatPage.jsx
import React, { useState } from 'react';
import MessageItem from './MessageItem';
import './ChatPage.css';

const dummyMessages = [
  { id: 1, sender: 'Admin', text: 'Hello, how can I help you?' },
  { id: 2, sender: 'User', text: 'I have a query regarding my account.' },
];

const ChatPage = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'User', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="chat-page-container">
      <h2 className="chat-title">Chat Support</h2>
      <div className="chat-messages">
        {messages.map((msg) => (
          <MessageItem key={msg.id} message={msg} />
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="chat-input"
        />
        <button onClick={handleSend} className="chat-send-button">Send</button>
      </div>
    </div>
  );
};

export default ChatPage;
