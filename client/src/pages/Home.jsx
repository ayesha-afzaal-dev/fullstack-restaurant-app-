import React from 'react';

function Home() {
  return (
    <div style={{ backgroundColor: "#1C1B18", color: "#F5F1E8", fontFamily: "Poppins, sans-serif" }}>

      {/* ===== HERO SECTION ===== */}
      <section
        className="d-flex align-items-center position-relative"
        style={{
          minHeight: "90vh",
          background: "radial-gradient(circle at 30% 40%, rgba(244,167,0,0.15), transparent 60%), #1C1B18",
          overflow: "hidden",
        }}
      >
      
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(244,167,0,0.25), transparent 70%)",
            filter: "blur(40px)",
          }}
        ></div>

        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{ backgroundColor: "rgba(244,167,0,0.15)", color: "#F4A700", border: "1px solid rgba(244,167,0,0.4)" }}
              >
                🌿 Warm Nights, Green Corners
              </span>
              <h1
                className="display-3 fw-bold mb-3"
                style={{ fontFamily: "Playfair Display, serif", color: "#F5F1E8" }}
              >
                Taste the Warmth of <span style={{ color: "#F4A700", textShadow: "0 0 20px rgba(244,167,0,0.5)" }}>I ❤ Clouds</span>
              </h1>
              <p className="fs-5 mb-4" style={{ color: "rgba(245,241,232,0.75)", maxWidth: "520px" }}>
                A cozy escape where soft yellow lights meet fresh greenery.
                Every dish is served with warmth, every corner made for lingering.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <a
                  href="#menu"
                  className="btn btn-lg rounded-3 px-4"
                  style={{ backgroundColor: "#F4A700", color: "#1C1B18", fontWeight: 600, boxShadow: "0 0 25px rgba(244,167,0,0.4)" }}
                >
                  View Menu
                </a>
                <a
                  href="#reservation"
                  className="btn btn-lg rounded-3 px-4"
                  style={{ backgroundColor: "transparent", color: "#F5F1E8", border: "1px solid rgba(245,241,232,0.4)" }}
                >
                  Book a Table
                </a>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-block">
              <div
                className="rounded-4 p-4"
                style={{
                  backgroundColor: "#2E4E3F",
                  border: "1px solid rgba(244,167,0,0.3)",
                  boxShadow: "0 0 40px rgba(244,167,0,0.15)",
                }}
              >
                <div className="d-flex justify-content-between mb-3">
                  <span style={{ color: "#F4A700", fontWeight: 600 }}>⭐ 4.9 Rating</span>
                  <span style={{ color: "rgba(245,241,232,0.6)" }}>2,300+ Reviews</span>
                </div>
                <p className="mb-0" style={{ color: "rgba(245,241,232,0.85)", fontFamily: "Playfair Display, serif", fontStyle: "italic" }}>
                  "The lighting, the plants, the food — every visit feels like a warm hug."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="py-5" style={{ backgroundColor: "#211F1B" }}>
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div
                className="rounded-4"
                style={{
                  height: "380px",
                  backgroundColor: "#2E4E3F",
                  border: "1px solid rgba(244,167,0,0.2)",
                }}
              ></div>
            </div>
            <div className="col-lg-6">
              <span style={{ color: "#F4A700", fontWeight: 600, letterSpacing: "2px" }}>OUR STORY</span>
              <h2 className="fw-bold my-3" style={{ fontFamily: "Playfair Display, serif" }}>
                Where Every Light Tells a Story
              </h2>
              <p style={{ color: "rgba(245,241,232,0.75)" }}>
                I ❤ Clouds began as a small dream — a place where soft amber light
                and fresh greenery could turn any evening into something memorable.
                Today, we serve comfort food in a space designed for slow, warm moments.
              </p>
              <div className="row mt-4 g-3">
                <div className="col-6">
                  <h3 style={{ color: "#F4A700", fontFamily: "Playfair Display, serif" }}>8+</h3>
                  <p style={{ color: "rgba(245,241,232,0.6)" }}>Years of Service</p>
                </div>
                <div className="col-6">
                  <h3 style={{ color: "#F4A700", fontFamily: "Playfair Display, serif" }}>50+</h3>
                  <p style={{ color: "rgba(245,241,232,0.6)" }}>Signature Dishes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED MENU ===== */}
      <section className="py-5" id="menu">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span style={{ color: "#F4A700", fontWeight: 600, letterSpacing: "2px" }}>FEATURED DISHES</span>
            <h2 className="fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
              From Our Kitchen to Your Table
            </h2>
          </div>

          <div className="row g-4">
            {[
              { name: "Herb Butter Steak", price: "$24", desc: "Grilled to perfection with garden herbs" },
              { name: "Green Basil Pasta", price: "$16", desc: "Fresh basil, parmesan, olive oil" },
              { name: "Golden Saffron Risotto", price: "$19", desc: "Creamy risotto with saffron gold" },
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div
                  className="rounded-4 p-4 h-100"
                  style={{
                    backgroundColor: "#211F1B",
                    border: "1px solid rgba(244,167,0,0.15)",
                    transition: "0.3s",
                  }}
                >
                  <div
                    className="rounded-3 mb-3"
                    style={{ height: "160px", backgroundColor: "#2E4E3F" }}
                  ></div>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="mb-0" style={{ fontFamily: "Playfair Display, serif" }}>{item.name}</h5>
                    <span style={{ color: "#F4A700", fontWeight: 700 }}>{item.price}</span>
                  </div>
                  <p style={{ color: "rgba(245,241,232,0.6)", fontSize: "0.9rem" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            {/* Fixed the broken opening tag here */}
            <a
              href="#"
              className="btn rounded-3 px-4 py-2"
              style={{ backgroundColor: "transparent", color: "#F4A700", border: "1px solid #F4A700" }}
            >
              View Full Menu
            </a>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="py-5" style={{ backgroundColor: "#211F1B" }}>
        <div className="container py-5">
          <div className="row g-4 text-center">
            {[
              { icon: "🌿", title: "Fresh Ingredients", desc: "Sourced daily from local farms" },
              { icon: "💡", title: "Cozy Ambiance", desc: "Warm lighting for every mood" },
              { icon: "👨‍🍳", title: "Expert Chefs", desc: "Crafted recipes, decades of skill" },
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="fs-1 mb-3">{item.icon}</div>
                <h5 style={{ fontFamily: "Playfair Display, serif" }}>{item.title}</h5>
                <p style={{ color: "rgba(245,241,232,0.6)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL ===== */}
      {/* ===== TESTIMONIALS ===== */}
      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span style={{ color: "#F4A700", fontWeight: 600, letterSpacing: "2px" }}>TESTIMONIALS</span>
            <h2 className="fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
              What Our Guests Say
            </h2>
          </div>

          <div className="row g-4">
            {[
              { name: "Sara Ahmed", role: "Regular Guest", text: "The atmosphere alone is worth the visit — warm lights, green plants, and food that tastes like home." },
              { name: "Ali Hassan", role: "Food Blogger", text: "Every dish felt handcrafted. The risotto alone deserves five stars, and the ambiance made it unforgettable." },
              { name: "Emma Clarke", role: "First-time Visitor", text: "Walked in for dinner, stayed for the vibe. This is now my favorite spot for a quiet evening out." },
              { name: "Zain Malik", role: "Local Guide", text: "Best hidden gem in town. The soft lighting and greenery make it feel like a different world." },
            ].map((review, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div
                  className="rounded-4 p-4 h-100 testimonial-card"
                  style={{
                    backgroundColor: "#211F1B",
                    border: "1px solid rgba(244,167,0,0.15)",
                  }}
                >
                  <div className="mb-3" style={{ color: "#F4A700", fontSize: "1.3rem" }}>
                    ★★★★★
                  </div>
                  <p style={{ color: "rgba(245,241,232,0.75)", fontSize: "0.95rem", minHeight: "110px" }}>
                    "{review.text}"
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-4">
                    <div
                      className="rounded-circle"
                      style={{ width: "42px", height: "42px", backgroundColor: "#2E4E3F", border: "1px solid rgba(244,167,0,0.3)" }}
                    ></div>
                    <div>
                      <h6 className="mb-0" style={{ color: "#F5F1E8" }}>{review.name}</h6>
                      <small style={{ color: "rgba(245,241,232,0.5)" }}>{review.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      

      {/* ===== RESERVATION CTA ===== */}
      <section
        className="py-5"
        id="reservation"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(244,167,0,0.12), transparent 70%), #1C1B18",
        }}
      >
        <div className="container py-5 text-center">
          <h2 className="fw-bold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
            Reserve Your Cozy Corner Tonight
          </h2>
          <p className="mb-4" style={{ color: "rgba(245,241,232,0.7)" }}>
            Tables fill up fast — book ahead to secure your evening under the warm lights.
          </p>
          <a
            href="#"
            className="btn btn-lg rounded-3 px-5"
            style={{ backgroundColor: "#F4A700", color: "#1C1B18", fontWeight: 600, boxShadow: "0 0 25px rgba(244,167,0,0.4)" }}
          >
            Book a Table
          </a>
        </div>
      </section>

    </div>
  );
}

export default Home;