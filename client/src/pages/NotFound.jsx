import React from "react";
import { Link } from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle";

function NotFound() {
    usePageTitle("Page Not Found")
  return (
    <div className="page-fade"
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "80vh", backgroundColor: "#F7FAFD", color: "#2D3B4E" }}
    >
      <div style={{ fontSize: "4rem", marginBottom: "10px" }}>☁️</div>
      <h1 className="display-4 fw-bold" style={{ fontFamily: "Playfair Display, serif" }}>
        404
      </h1>
      <p style={{ color: "#64748B", maxWidth: "400px" }} className="mb-4">
        This page drifted off somewhere. Let's get you back on track.
      </p>
      <Link
        to="/"
        className="btn btn-lg rounded-3 px-5"
        style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;