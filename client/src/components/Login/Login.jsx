// import { useState } from "react";
// import "./Login.css";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (username === "user" && password === "pass") {
//       alert("Login successful!");
//     } else {
//       setMessage("Invalid username or password.");
//     }
//   };

//   async function handlesubmit(e) {
//     e.preventDefualt();
//     try {
//       await axios.post("/users/Signup", {
//         username: UsernameVlaue,
//         password: PassValue,
//       });
//     } catch (error) {
//       console(error.response);
//     }
//   }

//   return (
//     <div className="login-page">
//     <div className="outer-container">
//       <div className="login-container">
//         <h2>Login to your account</h2>
//         <div className="new-account">
//           Don't have an account?<a href="/">create a new account</a>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             id="username"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             className="password-container"
//             type="password"
//             id="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <a href="/">
//             <button className="login-button" type="submit">
//               login
//             </button>
//           </a>
//         </form>
//         {message && <p style={{ color: "red" }}>{message}</p>}

//         <div className="New-account-2">
//           <a href="/">Create an account?</a>
//         </div>
//       </div>
//       <div className="p-container">
//         <a href="/">About</a>
//         <h1>Evangadi Networks Q&A</h1>
//         <div>
//           <p>
//             No matter what stage of life you are in, whether you’re just
//             starting elementary school or being promoted to CEO of a Fortune 500
//             company, you have much to offer to those who are trying to follow in
//             your footsteps.!
//           </p>
//           <p>
//             Wheather you are willing to share your knowledge or you are just
//             looking to meet mentors of your own, please start by joining the
//             network here.
//           </p>
//           <a href="/">
//             {" "}
//             <button className="last-button">How it works</button>
//           </a>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Login;

import { useState } from "react";
// import axios from "../../utilitis/AxiosConfig";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom"; // Ensure react-router-dom is installed

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Tracks current form (Login or Signup)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Handle input changes for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for both Login and Signup
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    // Basic validation
    if (!formData.username || !formData.password) {
      setMessage("Username and password are required.");
      setLoading(false);
      return;
    }

    if (!isLogin) {
      // Additional validation for Signup
      if (!formData.email) {
        setMessage("Email is required for signup.");
        setLoading(false);
        return;
      }
      if (!formData.firstName || !formData.lastName) {
        setMessage("First name and last name are required for signup.");
        setLoading(false);
        return;
      }
      // You can add more robust validation here (e.g., email format, password strength)
    }

    try {
      if (isLogin) {
        // Login Logic
        const response = await axios.post("/api/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          alert("Login successful!");
          // Redirect or perform other actions upon successful login
          navigate("/dashboard"); // Example redirection
        }
      } else {
        // Signup Logic
        console.log("data",formData)
        const response = await axios.post("http://localhost:5500/api/users/register", {
          username: formData.username,
          firstname: formData.firstName,
          lastname: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        console.log(response.status)
        if (response.status === 201) {
          alert("Signup successful! You can now log in.");
          setIsLogin(true); // Switch to Login form after successful signup
          setFormData({
            username: "",
            password: "",
            email: "",
            firstName: "",
            lastName: "",
          });
        }
      }
    } catch (error) {
      console.error(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Toggle between Login and Signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(""); // Clear any existing messages
    setFormData({
      username: "",
      password: "",
      email: "",
      firstname: "",
      lastname: "",
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
            {/* <label htmlFor="username">Username</label> */}
           
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
                {/* <label htmlFor="email">Email</label> */}
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

                  {/* <label htmlFor="lastName">Last Name</label> */}
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
              required
              autoFocus
            />

                {/* <label htmlFor="firstName">First Name</label> */}
              </>
            )}
            {/* <label htmlFor="password">Password</label> */}
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

         

            <button className="login-button" type="submit" disabled={loading}>
              {loading
                ? isLogin
                  ? "Logging in..."
                  : "Signing up..."
                : isLogin
                ? "Login"
                : "Sign Up"}
            </button>
          </form>
          {message && <p className="error-message">{message}</p>}
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

export default Auth;
