import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../../features/auth/authSlice';
import { authService } from '../../features/auth/authService';
import './Register.css';
import AuthHeader from '../../components/ui/Header';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.register(formData);
      dispatch(setCredentials({ user: data, token: data.token }));
      navigate('/');
    } catch (error) {
      alert(
        error.response?.data?.message || 'Registration failed. Please try again.'
      );
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
     <AuthHeader title="Register" />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
        required
      />

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

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}
