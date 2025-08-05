import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../features/admin/adminSlice';
import { deleteAccount } from '../../../features/users/userSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../../components/ui/Spinner';
import './UsersPage.css';

export default function UsersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users = [], isLoading = false } = useSelector(
    (state) => state.admin || {}
  );
  console.log('👥 users from Redux:', users);
  useEffect(() => {
    dispatch(getAllUsers()); // ✅ No token needed
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteAccount(userId));
    }
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="users-page">
      <h2>Manage Users</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? 'Admin' : 'User'}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/dashboard/users/edit/${user._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
