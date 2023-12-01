import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetStatus, setResetStatus] = useState('');
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    // Perform password reset logic (you may need to call a server API)
    // For simplicity, this example assumes a successful reset
    // In a real application, you would handle errors and server communication

    setResetStatus('Password reset successful!');
    navigate('/login');
  };

  return (
    <div>
      <h2>Reset Password</h2>
      {resetStatus ? (
        <p>{resetStatus}</p>
      ) : (
        <form onSubmit={handleReset}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;