import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import AuthHeader from '../../components/ui/Header';
import API from '../../utils/api/axiosInstance';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Basic email format check
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const res = await API.post('api/user/forgot-password', { email });
      setEmail('');
      setError('');
      toast(res.data.message || 'Reset link sent!');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Try again later.'
      );
    }
  };

  return (
    <form className="forgot-form" onSubmit={handleSubmit}>
      <AuthHeader title="Forgot Password" />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p className="input-error">{error}</p>}

      <button type="submit">Send Reset Link</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}
