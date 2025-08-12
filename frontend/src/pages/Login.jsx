import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { authService } from '../features/auth/authService';
import './Login.css';
import AuthHeader from '../components/ui/Header';
import { toast } from 'react-toastify';
import { useFormValidation } from '../hooks/useFormValidation';
import Spinner from '../components/ui/Spinner';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { validate } = useFormValidation();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData, 'login');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('formData', formData);
      const data = await authService.login(formData);
      console.log('data', data);
      localStorage.setItem('userId', data?.user?._id);
      dispatch(setCredentials({ user: data, token: data.token }));
      toast.success('Login successful!');

      navigate('/dashboard');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Login failed. Please check your credentials.'
      );
      navigate('/');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <AuthHeader title="Login" />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <p className="input-errorr">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="input-errorr">{errors.password}</p>}

      <button type="submit" className="login-button" disabled={isSubmitting}>
        {isSubmitting ? <Spinner small /> : 'Login'}
      </button>

      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </form>
  );
}
