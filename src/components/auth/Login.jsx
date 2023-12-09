import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // If using React Router for navigation
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {
  const notify = () => toast("Login successfully!");
  const navigate = useNavigate();
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

  // State to manage success message
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform authentication logic here (e.g., check credentials)
    // For simplicity, this example assumes invalid credentials result in an error message
    if (
      formData.email === "sivvaa331998@gmail.com" &&
      formData.password === "Shaasvik@23"
    ) {
      // Successful login, you can redirect the user or perform other actions
      console.log("Login successful!");
      //navigate to dashboard
      navigate("/user");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />{" "}
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </span>{" "}
          </div>
        </div>

        <button className="logBtn" type="submit" onClick={notify}>
          Login
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
      <p>
        <Link to="/reset-password">Forgot Password?</Link>
      </p>

      <p>
        New user? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
