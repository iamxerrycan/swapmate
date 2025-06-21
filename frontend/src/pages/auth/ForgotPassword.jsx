import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";
import AuthHeader from "../../components/ui/Header";
import API from "../../utils/axiosInstance";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("api/user/forgot-password", { email });
      setMessage(res.data.message || "Reset link sent!");
      setEmail("");
      setError("");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Try again later."
      );
      setMessage("");
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
        required
      />

      <button type="submit">Send Reset Link</button>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}
