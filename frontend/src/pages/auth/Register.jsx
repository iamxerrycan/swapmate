import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCredentials } from '../../features/auth/authSlice';
import { authService } from '../../features/auth/authService';
import './Register.css';
import AuthHeader from '../../components/ui/Header';
import { toast } from 'react-toastify';
import { useFormValidation } from '../../hooks/useFormValidation'; // adjust path as needed
import { useEffect } from 'react';
import Spinner from '../../components/ui/Spinner';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validate } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const timer = setTimeout(() => setErrors({}), 3000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Remove error message on change
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData, 'register');
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      const data = await authService.register(formData);
      dispatch(setCredentials({ user: data, token: data.token }));
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Registration failed. Please try again.'
      );
    }finally {
    setIsSubmitting(false);
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
      />
      {errors.name && <p className="input-error">{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChange}
      />
      {errors.email && <p className="input-error">{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      {errors.password && <p className="input-error">{errors.password}</p>}

      <button
  type="submit"
  className="login-button"
  disabled={isSubmitting}
>
  {isSubmitting ? <Spinner small /> : 'Register'}
</button>


      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}
