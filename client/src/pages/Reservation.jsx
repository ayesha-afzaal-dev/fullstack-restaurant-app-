import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ReservationForm from "../components/ReservationForm";

function Reservation() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "70vh", backgroundColor: "#F7FAFD", color: "#2D3B4E" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>☁️</div>
        <h2 style={{ fontFamily: "Playfair Display, serif" }}>Book Your Table</h2>
        <p style={{ color: "#64748B" }}>
          Please login or sign up first to reserve a table.
        </p>

        <div className="d-flex gap-3 mt-3">
          <button
            className="btn px-4"
            style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}
            onClick={() => navigate("/login", { state: { from: "/reservation" } })}
          >
            Login
          </button>
          <button
            className="btn px-4"
            style={{ backgroundColor: "transparent", color: "#2D3B4E", border: "1px solid rgba(91,137,181,0.4)" }}
            onClick={() => navigate("/signup", { state: { from: "/reservation" } })}
          >
            Sign Up
          </button>
        </div>
      </div>
    );
  }

  return <ReservationForm />;
}

export default Reservation;