import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usePageTitle from "../hooks/usePageTitle";

function Signup() {
  usePageTitle("Sign Up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const existingUser = localStorage.getItem(`user_${email}`);
    if (existingUser) {
      setError("An account with this email already exists. Please login instead.");
      return;
    }

    const result = signup(name, email, password);
    if (result.success) {
      navigate(redirectTo);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="page-fade" className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", backgroundColor: "#F7FAFD" }}>
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4"
        style={{ width: "360px", backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}
      >
        <h3 className="mb-4 text-center" style={{ color: "#2D3B4E", fontFamily: "Playfair Display, serif" }}>
          Create Your Account
        </h3>

        {error && <p style={{ color: "#C0392B", fontSize: "0.85rem" }}>{error}</p>}

        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control mb-3"
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control mb-3"
          style={inputStyle}
        />

        <button type="submit" className="btn w-100" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
          Create Account
        </button>

        <p className="text-center mt-3" style={{ color: "#64748B", fontSize: "0.9rem" }}>
          Already with us? <Link to="/login" style={{ color: "#5B89B5" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "#F7FAFD",
  color: "#2D3B4E",
  border: "1px solid rgba(91,137,181,0.2)",
};

export default Signup;