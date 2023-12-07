import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [resetStatus, setResetStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (password !== confirmPassword) {
      setGeneralError("Confirm password is incorrect");
      return;
    }

    // Check password strength
    const passwordStrengthRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    if (!passwordStrengthRegex.test(password)) {
      setPasswordError(
        "Password should be at least 8 characters with 1 uppercase and 1 special character"
      );
      return;
    }

    // Perform password reset logic (you may need to call a server API)
    // For simplicity, this example assumes a successful reset
    // In a real application, you would handle errors and server communication

    setResetStatus("Password reset successful!");
    navigate("/login");
  };

  // Handle reset button click

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
            <div className="password-input-container">
              <label htmlFor="password">New Password:</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="toggle-password"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {passwordError && (
                <p className="error-message">{passwordError}</p>
              )}
            </div>
          </div>
          <div className="password-input-container">
            <label>Confirm Password:</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
              {confirmPasswordError && (
                <p className="error-message">{confirmPasswordError}</p>
              )}
            </div>
          </div>
          {generalError && <p className="error-message">{generalError}</p>}
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
