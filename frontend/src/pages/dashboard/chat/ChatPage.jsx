import React, { useState, useEffect } from 'react';
import MessageItem from './MessageItem';
import io from 'socket.io-client';
import './ChatPage.css';

const socket = io(import.meta.env.VITE_API_BASE_URL, { withCredentials: true });

const ChatPage = ({ currentUser, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (currentUser && receiverId) {
      socket.emit('joinRoom', { senderId: currentUser._id, receiverId });

      socket.on('receiveMessage', (message) => {
        setMessages((prev) => [...prev, message]);
      });

      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/messages/${receiverId}`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => setMessages(data));
    }

    return () => {
      socket.off('receiveMessage');
    };
  }, [currentUser, receiverId]);

  const handleSend = () => {
    if (input.trim()) {
      const messageData = {
        senderId: currentUser._id,
        receiverId,
        text: input,
      };

      socket.emit('sendMessage', messageData);
      setMessages((prev) => [...prev, { ...messageData, self: true }]);
      setInput('');
    }
  };

  return (
    <div className="chat-page-container">
      <h2 className="chat-title">Chat Support</h2>

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <MessageItem key={idx} message={msg} />
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
        <button onClick={handleSend} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
