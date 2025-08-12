import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';

const ChatPage = () => {
  const { chatId } = useParams();
  const location = useLocation();
  const currentUserId = localStorage.getItem('userId');
  console.log('currentUserId', currentUserId);
  console.log('location', location);
  console.log('chatId', chatId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!chatId) return;

    // Correct API path with /api prefix
    API.get(`/api/chat/${chatId}/messages`)
      .then((res) => setMessages(res.data))
      .catch((err) => console.error(err));
  }, [chatId]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const receiver =
      location.state?.otherUser?._id ||
      location.state?.participants?.find((p) => p._id !== currentUserId)?._id;

    if (!receiver) {
      console.error('Receiver is missing. Cannot send message.');
      alert('Chat receiver information is missing. Please reopen the chat.');
      return;
    }

    try {
      console.log('Sending message:', {
        chatId,
        sender: currentUserId,
        receiver,
        content: input,
      });

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
    <div>
      <h2>Chat</h2>
      <div
        style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid #ccc',
          padding: 10,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              textAlign: msg.sender._id === currentUserId ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                padding: '8px 12px',
                borderRadius: 20,
                backgroundColor:
                  msg.sender._id === currentUserId ? '#DCF8C6' : '#fff',
                border: '1px solid #ccc',
                display: 'inline-block',
              }}
            >
              {msg.content}
            </span>
          </div>
        ))}
      </div>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') sendMessage();
        }}
        placeholder="Type a message..."
        style={{ width: '80%', padding: 8 }}
      />
      <button onClick={sendMessage} disabled={!input.trim()}>
        Send
      </button>
    </div>
  );
};

export default ChatPage;
