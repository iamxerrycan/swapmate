import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { authService } from '../features/auth/authService';
import './Login.css'; // Create this file
import AuthHeader from '../components/ui/Header';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(formData);
      dispatch(setCredentials({ user: data, token: data.token }));
      navigate('/home');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Login failed. Please check your credentials.'
      );
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <AuthHeader title="Login" />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
        required
      />

      <button type="submit">Login</button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </form>
  );
}
