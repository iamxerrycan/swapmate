import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../../utils/axiosInstance";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`api/user/reset-password/${token}`, { password });
      setMessage(data.message);
    } catch (err) {
      setMessage("Reset failed" , err);
    }
  };

  return (
    <form onSubmit={handleReset}>
      <h2>🔐 Reset Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Reset Password</button>
      {message && <p>{message}</p>}
    </form>
  );
}


