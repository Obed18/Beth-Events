import { useState } from "react";
import { motion } from "framer-motion";
import '../styles/AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@bethevents.com" && password === "admin123") {
      window.location.href = "/admin"; // Redirect to admin portal
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="title">Admin Login</h2>
        <p className="subtitle">Sign in to access the dashboard</p>
        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="admin@bethevents.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="admin123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-visibility"
              onClick={() => setShowPassword(!showPassword)}
            ></span>
          </div>

          <div className="options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <motion.button
            type="submit"
            className="sign-in-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign in
          </motion.button>

          <a href="/" className="homepage-link">
            Return to homepage
          </a>
        </form>

        <div className="demo-credentials">
          <p>For demo purposes, use:</p>
          <p>Email: admin@bethevents.com</p>
          <p>Password: admin123</p>
        </div>
      </motion.div>
    </div>
  );
}