import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './ChatPage.css';

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const currentUserId = localStorage.getItem('userId');

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;

    API.get(`/api/chat/${chatId}/messages`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!chatId || !currentUserId) return;

    API.put(`/api/messages/read/${chatId}`, { userId: currentUserId })
      .then(() => {
        console.log('Messages marked as read');
        // Optional: you can refetch chats or update unread count elsewhere if needed
      })
      .catch((err) => console.error('Mark read failed:', err));
  }, [chatId, currentUserId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const receiver =
      location.state?.otherUser?._id ||
      location.state?.participants?.find((p) => p._id !== currentUserId)?._id;

    if (!receiver) {
      alert('Chat receiver info missing. Please reopen the chat.');
      return;
    }

    try {
      await API.post(`/api/messages`, {
        chatId,
        sender: currentUserId,
        receiver,
        content: input,
      });
      setInput('');
      const { data } = await API.get(`/api/chat/${chatId}/messages`);
      setMessages(data);
    } catch (error) {
      console.error(
        'Send message failed:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">
        Chat with {location.state?.otherUser?.name || 'User'}
      </h2>
      <div className="chat-window">
        {messages.map((msg) => {
          const isSender = msg.sender._id === currentUserId;
          return (
            <div
              key={msg._id}
              className={`message-row ${isSender ? 'sender' : 'receiver'}`}
            >
              <div className="message-bubble">
                {msg.content}
                <div className="timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button
          onClick={sendMessage}
          disabled={!input.trim()}
          className="send-button"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
