import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const currentUserId = localStorage.getItem('userId');

  useEffect(() => {
    if (!currentUserId) return;

    API.get(`/api/chat?userId=${currentUserId}`)
      .then((res) => setChats(res.data))
      .catch((err) => console.error(err));
  }, [currentUserId]);

  const openChat = (chat) => {
    const otherUser = chat.participants.find((p) => p._id !== currentUserId);
    navigate(`/dashboard/chat/${chat._id}`, {
      state: {
        otherUser,
        chatId: chat._id,
        swapId: chat.swapId || null,
        participants: chat.participants, // agar ChatPage me ye chahiye
      },
    });
  };

  return (
    <div>
      <h2>Your Chats</h2>
      {chats.length === 0 ? (
        <p>No chats yet</p>
      ) : (
        <ul>
          {chats.map((chat) => {
            const otherUser = chat.participants.find((p) => p._id !== currentUserId);
            return (
              <li
                key={chat._id}
                onClick={() => openChat(chat)}
                style={{ cursor: 'pointer', padding: '8px', borderBottom: '1px solid #ccc' }}
              >
                {otherUser.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
