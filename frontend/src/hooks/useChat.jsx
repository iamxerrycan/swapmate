// src/hooks/useChat.js
import { useState, useEffect } from 'react';
import API from '../utils/api/axiosInstance';

export const useChat = () => {
  const currentUserId = localStorage.getItem('userId');
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(false);
  const [errorChats, setErrorChats] = useState(null);

  const fetchChats = async () => {
    if (!currentUserId) return;
    setLoadingChats(true);
    try {
      const res = await API.get(`/api/chat?userId=${currentUserId}`);
      setChats(res.data);
      setErrorChats(null);
    } catch (error) {
      setErrorChats(error.response?.data?.error || error.message);
    } finally {
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [currentUserId]);

  const markMessagesRead = async (chatId) => {
    if (!currentUserId || !chatId) return;
    try {
      await API.put(`/api/messages/read/${chatId}`, { userId: currentUserId });
    } catch (error) {
      console.error('Failed to mark messages as read:', error);
    }
  };

  const sendMessage = async ({ chatId, receiverId, content }) => {
    if (!currentUserId || !chatId || !receiverId || !content) return;
    await API.post(`/api/messages`, {
      chatId,
      sender: currentUserId,
      receiver: receiverId,
      content,
    });
  };

  return {
    currentUserId,
    chats,
    loadingChats,
    errorChats,
    fetchChats,
    markMessagesRead,
    sendMessage,
  };
};
