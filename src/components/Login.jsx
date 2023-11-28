import React, { useState } from "react";
import { Link } from "react-router-dom"; // If using React Router for navigation
import "./Login.css";

const Login = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to manage error messages
  const [error, setError] = useState("");

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
      formData.email === "user@example.com" &&
      formData.password === "password"
    ) {
      // Successful login, you can redirect the user or perform other actions
      console.log("Login successful!");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
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
