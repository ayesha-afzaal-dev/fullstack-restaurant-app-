import React, { useState } from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

function ForgotPassword() {
  usePageTitle("Forgot Password");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="page-fade" className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh", backgroundColor: "#F7FAFD" }}>
      <div
        className="p-4 rounded-4"
        style={{ width: "360px", backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}
      >
        <h3 className="mb-3 text-center" style={{ color: "#2D3B4E", fontFamily: "Playfair Display, serif" }}>
          Reset Password
        </h3>

        {sent ? (
          <p style={{ color: "#64748B", textAlign: "center" }}>
            If an account exists for {email}, a reset link has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ color: "#64748B", fontSize: "0.85rem" }} className="mb-3">
              Enter your email and we'll send you a reset link.
            </p>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mb-3"
              style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", border: "1px solid rgba(91,137,181,0.2)" }}
            />
            <button type="submit" className="btn w-100" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
              Send Reset Link
            </button>
          </form>
        )}

        <p className="text-center mt-3" style={{ color: "#64748B", fontSize: "0.9rem" }}>
          <Link to="/login" style={{ color: "#5B89B5" }}>Back to Login</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;