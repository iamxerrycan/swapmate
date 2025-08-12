import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/api/axiosInstance';
import './ChatList.css';

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const currentUserId = localStorage.getItem('userId');
  console.log('chats', chats);
  

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
        participants: chat.participants,
      },
    });
  };

  return (
    <div className="chat-list-container">
      <h2 className="chat-list-header">Your Chats</h2>
      {chats.length === 0 ? (
        <p className="chat-list-empty">No chats yet</p>
      ) : (
        <ul className="chat-list">
          {chats.map((chat) => {
            const otherUser = chat.participants.find((p) => p._id !== currentUserId);
            const unread = chat.unreadCount || 0;

            return (
              <li
                key={chat._id}
                onClick={() => openChat(chat)}
                className={`chat-list-item ${unread > 0 ? 'unread' : ''}`}
              >
                <div className="chat-list-avatar">
                  {otherUser.avatar ? (
                    <img src={otherUser.avatar} alt={otherUser.name} />
                  ) : (
                    otherUser.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="chat-list-info">
                  <div className="chat-list-name">{otherUser.name}</div>
                </div>

                {unread > 0 && (
                  <div className="chat-unread-badge">
                    {unread > 99 ? '99+' : unread}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ChatList;
