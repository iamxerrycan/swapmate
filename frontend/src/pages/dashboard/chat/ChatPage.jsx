import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useChat } from '../../../hooks/useChat';
import API from '../../../utils/api/axiosInstance';
import './ChatPage.css';

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const { currentUserId, markMessagesRead, sendMessage } = useChat();

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
    markMessagesRead(chatId);
  }, [chatId, currentUserId, markMessagesRead]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const receiver =
      location.state?.otherUser?._id ||
      location.state?.participants?.find((p) => p._id !== currentUserId)?._id;

    if (!receiver) {
      alert('Chat receiver info missing. Please reopen the chat.');
      return;
    }

    try {
      await sendMessage({ chatId, receiverId: receiver, content: input });
      setInput('');
      const { data } = await API.get(`/api/chat/${chatId}/messages`);
      setMessages(data);
    } catch (error) {
      console.error('Send message failed:', error.response?.data || error.message);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">Chat with {location.state?.otherUser?.name || 'User'}</h2>
      <div className="chat-window">
        {messages.map((msg) => {
          const isSender = msg.sender._id === currentUserId;
          return (
            <div key={msg._id} className={`message-row ${isSender ? 'sender' : 'receiver'}`}>
              <div className="message-bubble">
                {msg.content}
                <div className="timestamp">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} disabled={!input.trim()} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
