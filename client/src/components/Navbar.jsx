import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg py-3"
      style={{ backgroundColor: "#F7FAFD", borderBottom: "1px solid rgba(45,59,78,0.08)" }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand fw-bold fs-3 mb-0"
          to="/"
          style={{ fontFamily: "Playfair Display, serif", color: "#2D3B4E" }}
        >
          I <span style={{ color: "#5B89B5" }}>❤</span> Clouds
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          style={{ borderColor: "#2D3B4E" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navMenu">
          <ul className="navbar-nav align-items-lg-center gap-lg-4 gap-2 mt-3 mt-lg-0" style={{ fontFamily: "Poppins, sans-serif" }}>
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "#2D3B4E" }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/menu" style={{ color: "#2D3B4E" }}>Menu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about" style={{ color: "#2D3B4E" }}>About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reservation" style={{ color: "#2D3B4E" }}>Reservation</Link>
            </li>
            <li className="nav-item">
              <Link
                className="btn rounded-3 px-4"
                to="/contact"
                style={{ backgroundColor: "#EAF1F8", color: "#5B89B5", border: "1px solid #5B89B5" }}
              >
                Contact
              </Link>
            </li>

            {/* ===== Sirf tab dikhta hai jab koi login ho ===== */}
            {user && (
              <li className="nav-item d-flex align-items-center gap-3">
                {/* Role ke hisab se sirf EK link dikhega, kabhi dono nahi */}
                {user.role === "admin" ? (
                  <Link to="/admin" className="nav-link" style={{ color: "#C9A659", fontWeight: 600 }}>
                    Admin
                  </Link>
                ) : (
                  <Link to="/my-bookings" className="nav-link" style={{ color: "#2D3B4E" }}>
                    My Bookings
                  </Link>
                )}

                {/* <span style={{ color: "#64748B", fontSize: "0.85rem" }}>Hi, {user.name.split(" ")[0]}</span> */}

                <button
                  onClick={handleLogout}
                  className="btn btn-sm rounded-3 px-3"
                  style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;