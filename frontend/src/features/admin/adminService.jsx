import API from '../../utils/api/axiosInstance';
// Get users
// export const fetchAllUsers = async (token) => {
//   const res = await API.get('/users', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.data;
// };

export const fetchAllUsers = async () => {
  try {
    const response = await API.get('/api/admin/users');
    console.log("🟢 API Response from /admin/users: ", response.data); 
    return response.data;
  } catch (error) {
    console.error("🔴 Error fetching users: ", error.response?.data || error.message);
    throw error;
  }
};

export const fetchAllItems = async (token) => {
  const res = await API.get('/items', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const blockUser = async (userId, token) => {
  const res = await API.put(
    `/users/block/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const unblockUser = async (userId, token) => {
  const res = await API.put(
    `/users/unblock/${userId}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

export const deleteUser = async (userId, token) => {
  const res = API.delete(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deleteItem = async (itemId, token) => {
  const res = await API.delete(`/items/${itemId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const updateUserRole = async ({ userId, role }, token) => {
  const res = await API.put(
    `/users/${userId}/role`,
    { role },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
