import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/user/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        console.log("response", response);
        if (response.status == 200) {
          localStorage.setItem("token", response.data.token);
          toast(response.data.message);
          navigate("/user");
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.message);
      });
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
            {formData.password && (
              <span
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            )}{" "}
          </div>
        </div>

        <button className="logBtn" type="submit">
          Login
        </button>
      </form>
      <p>
        <Link to="/forgotpassword">Forgot Password?</Link>
      </p>

      <p>
        New user? <Link to="/register">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
