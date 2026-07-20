import React, { useState, useEffect } from "react";
import { useReviews } from "../context/ReviewContext";
import { useAuth } from "../context/AuthContext";

function MenuCard({ name, price, desc, image }) {
  const { addRating, getAverage, getCount, fetchDishReviews } = useReviews();
  const { user } = useAuth();
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    fetchDishReviews(name);
  }, [name]);

  const average = getAverage(name);
  const count = getCount(name);

  const handleRate = (star) => {
    if (!user) return;
    addRating(name, star, user.id);
  };

  
  return (
    <div
      className="rounded-4 p-4 h-100"
      style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid rgba(91,137,181,0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(91,137,181,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div
        className="rounded-3 mb-3"
        style={{
          height: "160px",
          backgroundColor: "#EAF1F8",
          backgroundImage: image ? `url(${image})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="d-flex justify-content-between align-items-start mb-2">
        <h5
          className="mb-0"
          style={{ fontFamily: "Playfair Display, serif", color: "#2D3B4E" }}
        >
          {name}
        </h5>
        <span style={{ color: "#C9A659", fontWeight: 700 }}>{price}</span>
      </div>

      <p style={{ color: "#64748B", fontSize: "0.9rem" }}>{desc}</p>

      {/* ===== Star Rating ===== */}
      <div className="d-flex align-items-center gap-1 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => addRating(name, star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            role="button"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
            style={{
              cursor: "pointer",
              color:
                star <= (hovered || Math.round(average || 0))
                  ? "#C9A659"
                  : "#CBD5E1",
              fontSize: "1.1rem",
              transition: "color 0.15s ease",
            }}
          >
            ★
          </span>
        ))}
        <span
          style={{ color: "#94A3B8", fontSize: "0.75rem", marginLeft: "6px" }}
        >
          {average ? `${average} (${count})` : "No ratings yet"}
        </span>
      </div>
    </div>
  );
}

export default MenuCard;
