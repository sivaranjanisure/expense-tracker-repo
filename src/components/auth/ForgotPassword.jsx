import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errMessage, setErrMessage] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    if (formData.password === formData.confirmPassword) {
      await axios
        .post("http://localhost:3000/user/forgot-password", {
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log("response", response);
          if (response.status == 200) {
            toast(response.data.message);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          toast(error.response.data.message);
        });
    } else {
      setErrMessage(true);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <div className="password-input-wrapper">
          <label htmlFor="password">New password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span className="toggle-pass" onClick={togglePasswordVisibility}>
            {showPassword ? "Hide" : "Show"}
          </span>
        </div>
        <div className="password-input-wrapper">
          <label htmlFor="password">Confirm password:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <span className="toggle-pass" onClick={toggleConfirmVisibility}>
            {showConfirmPassword ? "Hide" : "Show"}
          </span>
        </div>
        <span className="error">
          {errMessage && "New password and confirm password should match"}
        </span>
        <button className="reset" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
