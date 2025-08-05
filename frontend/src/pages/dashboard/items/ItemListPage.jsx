// src/pages/dashboard/chat/ChatBox.jsx

import React, { useState } from 'react';
import MessageItem from './MessageItem';

const ChatBox = ({ messages = [], onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <div className="chat-box p-4 bg-white rounded shadow flex flex-col h-full">
      <div className="messages flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, index) => (
          <MessageItem key={index} message={msg} />
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-1 border p-2 rounded-l"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message"
        />
        <button
          className="bg-blue-600 text-white px-4 rounded-r"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
