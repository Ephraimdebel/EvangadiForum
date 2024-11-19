// src/components/Login/Auth.jsx

import React, { useState, useContext, useEffect } from "react";
import axios from "../../Api/axios";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AppState } from "../../App"; // Assuming you have a context for auth state
import { toast } from "react-toastify"; // Import toast

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Tracks current form (Login or Signup)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);



  const navigate = useNavigate();
  const navStateData =useLocation()
  console.log(navStateData)
  // const { setUser } = useContext(AppState); // Access setUser if needed
  const { setUser, user } = useContext(AppState); // Access user context

  // RegEx Patterns

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email should follow basic format
  const passwordRegex = /^.{8,}$/; // At least 8 characters
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/; // 3-20 characters long, only letters, numbers, underscore, and hyphen

  // Handle input changes for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for both Login and Signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Frontend Validation
    const { username, password, email, firstName, lastName } = formData;

    // Validate Email and Password for both Login and Signup
    if (!email || !password) {
      toast.error("Email and password are required.");
      setLoading(false);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (!isLogin) {
      // Additional validation for Signup
      if (!firstName || !lastName) {
        toast.error("First name and last name are required for signup.");
        setLoading(false);
        return;
      }

      if (!usernameRegex.test(username)) {
        toast.error(
          "Username must be 3-20 characters long and can include letters, numbers, underscores, and hyphens."
        );
        setLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        // Login Logic
        const response = await axios.post("/users/login", {
          email,
          password,
        });

        if (response.status === 200) {
          toast.success("Login successful!");
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("userid", response.data.userid);
          setUser(response.data); // Update user context if necessary

          
        }else{
          toast.error("Login failed. Please check your credentials. if you don't have an account, please signup first.");
        }
      } else {
        // Signup Logic
        const response = await axios.post("/users/register", {
          username,
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        });

        if (response.status === 201) {
          toast.success("Signup successful! You can now log in.");
          setIsLogin(true); // Switch to Login form after successful signup
          setFormData({
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
          });
        }else{
          toast.error("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("My current error",error?.response?.data?.msg);
      if (
        error.response ||
        error.response.data ||
        error.response.data.message
      ) {
        toast.error(error?.response?.data?.msg);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  //Use this effect to navigate once the user state is set
  useEffect(() => {
    if (user) {
      console.log("User is set, navigating...");
      navigate(navStateData.state?.redirect || "/", { replace: true });
    }
  }, [user, navigate, navStateData.state?.redirect]);  // Trigger navigation when user changes

  // Toggle between Login and Signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    });
  };

  return (
    <div className="login-page">
      <div className="outer-container">
        {/* Login/Signup Form Container */}
        <div className="login-container">
          <h2>{isLogin ? "Login to your account" : "Create a new account"}</h2>
          <div className="new-account">
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <button className="toggle-button" onClick={toggleForm}>
                  Create a new account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button className="toggle-button" onClick={toggleForm}>
                  Login
                </button>
              </>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required={!isLogin}
            />

            {/* Conditionally render additional fields for Signup */}
            {!isLogin && (
              <>
                <div className="name-container">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />

                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required={!isLogin}
                  autoFocus
                />
              </>
            )}

            {/* Password Field */}
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                aria-label="Password"
              />
              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit Button */}
            <button className="login-button" type="submit" disabled={loading}>
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Login"
                : "Agree and join"}
            </button>
          </form>
          {/* Optional: Remove inline error message as we use toasts */}
          {/* {message && <p className="error-message">{message}</p>} */}
        </div>

        {/* Accompanying Text Container */}
        <div className="p-container">
          <a href="/about">About</a>
          <h1>Evangadi Networks Q&A</h1>
          <div>
            <p>
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps!
            </p>
            <p>
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>
            <a href="/how-it-works">
              <button className="last-button">How it works</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
