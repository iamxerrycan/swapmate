// src/pages/auth/ResetPassword.jsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import API from '../../utils/api/axiosInstance';
import FormInput from '../../components/common/FormInput';
import styles from './ResetPassword.module.css';

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`api/user/reset-password/${token}`, {
        password,
      });
      setMessage(data.message);
    } catch {
      setMessage('Reset failed');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleReset} className={styles.form}>
        <h2 className={styles.heading}>🔐 Reset Password</h2>

        <FormInput
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
         
        />

        <button type="submit" className={styles.button}>
          Reset Password
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
}
