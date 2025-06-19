import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // When backend is ready, replace with real API call
    setMessage(`Password reset link sent to: ${email}`);
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        style={{ padding: "8px", marginBottom: "1rem" }}
      /><br />
      <button type="submit">Send Reset Link</button>
      {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      <p>
  Already have an account? <Link to="/">Login</Link>
</p>
    </form>
  );
}
