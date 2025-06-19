import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css"; // Create this file
import AuthHeader from "../../components/ui/Header";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace this with real API call when backend is ready
    setMessage(`Password reset link sent to: ${email}`);
    setEmail("");
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

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}
