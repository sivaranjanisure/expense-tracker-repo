import React, { useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendResetLink = () => {
    // TODO: Implement the logic to send a reset link to the email address.
    // For demonstration purposes, display a message.
    setMessage("Password reset link sent to " + email);
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address below to reset your password.</p>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="reset" type="button" onClick={sendResetLink}>
          Reset Password
        </button>
      </form>
      <div>{message}</div>
    </div>
  );
};

export default ForgotPassword;
