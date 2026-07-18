import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#EAF1F8", color: "#2D3B4E", fontFamily: "Poppins, sans-serif" }}>
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-lg-4">
            <h4 style={{ fontFamily: "Playfair Display, serif", color: "#2D3B4E" }}>
              I <span style={{ color: "#5B89B5" }}>❤</span> Clouds
            </h4>
            <p style={{ color: "#64748B", maxWidth: "300px" }}>
              A quiet corner where soft light and thoughtfully made food come together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-6">
            <h6 style={{ color: "#2D3B4E", letterSpacing: "1px" }}>EXPLORE</h6>
            <ul className="list-unstyled mt-3">
              <li className="mb-2"><Link to="/" style={linkStyle}>Home</Link></li>
              <li className="mb-2"><Link to="/menu" style={linkStyle}>Menu</Link></li>
              <li className="mb-2"><Link to="/about" style={linkStyle}>About</Link></li>
              <li className="mb-2"><Link to="/gallery" style={linkStyle}>Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-6">
            <h6 style={{ color: "#2D3B4E", letterSpacing: "1px" }}>CONTACT</h6>
            <ul className="list-unstyled mt-3">
              <li className="mb-2" style={{ color: "#64748B" }}>123 Garden Street, Karachi</li>
              <li className="mb-2" style={{ color: "#64748B" }}>+92 300 1234567</li>
              <li className="mb-2" style={{ color: "#64748B" }}>hello@ihcloudsrestaurant.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div className="col-lg-3 col-6">
            <h6 style={{ color: "#2D3B4E", letterSpacing: "1px" }}>HOURS</h6>
            <p style={{ color: "#64748B" }} className="mt-3 mb-1">Mon – Sun</p>
            <p style={{ color: "#2D3B4E", fontWeight: 500 }}>12:00 PM – 11:00 PM</p>
          </div>
        </div>

        <hr style={{ borderColor: "rgba(91,137,181,0.2)", margin: "32px 0 20px" }} />

        <div className="d-flex justify-content-between flex-wrap gap-2">
          <p style={{ color: "#94A3B8", fontSize: "0.85rem", marginBottom: 0 }}>
            © {new Date().getFullYear()} I ❤ Clouds. All rights reserved.
          </p>
          <div className="d-flex gap-3">
            <a href="#" style={{ color: "#5B89B5", fontSize: "0.85rem", textDecoration: "none" }}>Instagram</a>
            <a href="#" style={{ color: "#5B89B5", fontSize: "0.85rem", textDecoration: "none" }}>Facebook</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const linkStyle = { color: "#64748B", textDecoration: "none", fontSize: "0.95rem" };

export default Footer;