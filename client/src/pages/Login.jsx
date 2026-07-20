import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usePageTitle from "../hooks/usePageTitle";

function Login() {
  usePageTitle("Login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) navigate(redirectTo);
    else setError(result.message);
  };

  return (
    <div
      className="page-fade"
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh", backgroundColor: "#F7FAFD" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4"
        style={{
          width: "360px",
          backgroundColor: "#FFFFFF",
          border: "1px solid rgba(91,137,181,0.15)",
        }}
      >
        <h3
          className="mb-4 text-center"
          style={{ color: "#2D3B4E", fontFamily: "Playfair Display, serif" }}
        >
          Welcome Back
        </h3>

        {error && (
          <p style={{ color: "#C0392B", fontSize: "0.9rem" }}>{error}</p>
        )}

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
          className="form-control mb-2"
          style={inputStyle}
        />

        <div className="text-end mb-3">
          <Link
            to="/forgot-password"
            style={{ color: "#5B89B5", fontSize: "0.8rem" }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="btn w-100"
          style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}
        >
          Login
        </button>

        <p
          className="text-center mt-3"
          style={{ color: "#64748B", fontSize: "0.9rem" }}
        >
          New here?{" "}
          <Link to="/signup" style={{ color: "#5B89B5" }}>
            Create an account
          </Link>
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

export default Login;
