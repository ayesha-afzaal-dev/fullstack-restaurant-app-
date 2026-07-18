import React, { useState } from "react";

const galleryImages = [
  { id: 1, category: "Ambiance" },
  { id: 2, category: "Food" },
  { id: 3, category: "Ambiance" },
  { id: 4, category: "Food" },
  { id: 5, category: "Interior" },
  { id: 6, category: "Food" },
  { id: 7, category: "Interior" },
  { id: 8, category: "Ambiance" },
  { id: 9, category: "Food" },
];

const categories = ["All", "Ambiance", "Food", "Interior"];

function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredImages =
    activeFilter === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeFilter);

  return (
    <div style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif" }}>
      <section className="py-5 text-center" style={{ paddingTop: "100px" }}>
        <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px" }}>GALLERY</span>
        <h1 className="display-4 fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
          A Few Quiet Moments
        </h1>
        <p style={{ color: "#64748B", maxWidth: "550px" }} className="mx-auto mt-2">
          A glimpse into our food, our space, and the calm we serve every day.
        </p>
      </section>

      <section className="pb-4">
        <div className="container d-flex justify-content-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className="btn rounded-pill px-4"
              style={{
                backgroundColor: activeFilter === cat ? "#5B89B5" : "transparent",
                color: activeFilter === cat ? "#FFFFFF" : "#2D3B4E",
                border: "1px solid rgba(91,137,181,0.4)",
                fontWeight: 500,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-5">
        <div className="container pb-5">
          <div className="row g-4">
            {filteredImages.map((img) => (
              <div className="col-md-4" key={img.id}>
                <div
                  className="rounded-4"
                  style={{
                    height: "260px",
                    backgroundColor: "#EAF1F8",
                    border: "1px solid rgba(91,137,181,0.2)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "16px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="badge rounded-pill px-3 py-1"
                    style={{ backgroundColor: "rgba(255,255,255,0.85)", color: "#5B89B5", fontSize: "0.75rem" }}
                  >
                    {img.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gallery;