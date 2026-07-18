import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ReservationForm() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookings = JSON.parse(localStorage.getItem("clouds_bookings") || "[]");
    bookings.push({ ...formData, bookedBy: user.email });
    localStorage.setItem("clouds_bookings", JSON.stringify(bookings));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center text-center"
        style={{ minHeight: "70vh", backgroundColor: "#F7FAFD", color: "#2D3B4E" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>☁️</div>
        <h2 style={{ fontFamily: "Playfair Display, serif" }}>Your Table Is Set</h2>
        <p style={{ color: "#64748B" }}>
          Thank you, {formData.name}. We'll have your table ready on {formData.date} at {formData.time}.
        </p>

        <div className="d-flex gap-3 mt-4">
          <button
            className="btn px-4"
            style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            className="btn px-4"
            style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
            onClick={() => {
              logout();
              navigate("/signup");
            }}
          >
            Logout & Use Different Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center py-5"
      style={{ minHeight: "80vh", backgroundColor: "#F7FAFD" }}
    >
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded-4"
        style={{ width: "480px", maxWidth: "90%", backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}
      >
        <h3 className="mb-4 text-center" style={{ color: "#2D3B4E", fontFamily: "Playfair Display, serif" }}>
          Reserve Your Table
        </h3>

        <div className="row g-3">
          <div className="col-12">
            <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Full Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
          </div>

          <div className="col-12">
            <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Phone Number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="form-control mt-1" style={inputStyle} placeholder="03XX-XXXXXXX" />
          </div>

          <div className="col-6">
            <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Date</label>
            <input type="date" name="date" required value={formData.date} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
          </div>

          <div className="col-6">
            <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Time</label>
            <input type="time" name="time" required value={formData.time} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
          </div>

          <div className="col-12">
            <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Number of Guests</label>
            <select name="guests" value={formData.guests} onChange={handleChange} className="form-control mt-1" style={inputStyle}>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Special Request (optional)</label>
            <textarea name="notes" rows="3" value={formData.notes} onChange={handleChange} className="form-control mt-1" style={inputStyle} placeholder="Window seat, birthday celebration, etc."></textarea>
          </div>
        </div>

        <button
          type="submit"
          className="btn w-100 mt-4"
          style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}
        >
          Confirm Reservation
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "#F7FAFD",
  color: "#2D3B4E",
  border: "1px solid rgba(91,137,181,0.2)",
};

export default ReservationForm;