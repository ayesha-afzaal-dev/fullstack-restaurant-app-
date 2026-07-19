import React from "react";
import usePageTitle from "../hooks/usePageTitle";
import useScrollReveal from "../hooks/useScrollReveal";
import aboutImg from "../assets/images/aboutpage.jpg";

function About() {
  usePageTitle("About Us");
  const [storyRef, storyVisible] = useScrollReveal();

  return (
    <div
      className="page-fade"
      style={{
        backgroundColor: "#F7FAFD",
        color: "#2D3B4E",
        fontFamily: "Poppins, sans-serif",
        overflowX: "hidden",
      }}
    >
      <section className="py-5 text-center" style={{ paddingTop: "100px" }}>
        <span
          style={{
            color: "#5B89B5",
            fontWeight: 600,
            letterSpacing: "2px",
            fontSize: "0.85rem",
          }}
        >
          OUR STORY
        </span>
        <h1
          className="fw-bold mt-2 px-3"
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
          }}
        >
          Built on Soft Light and Slow Mornings
        </h1>
      </section>

      <section className="py-5" style={{ backgroundColor: "#EAF1F8" }}>
        <div className="container py-4 py-md-5">
          <div
            ref={storyRef}
            className={`row align-items-center g-4 g-md-5 reveal ${storyVisible ? "visible" : ""}`}
          >
            <div className="col-12 col-lg-6">
              <img
                src={aboutImg}
                alt="Interior of I Love Clouds restaurant"
                className="rounded-4 img-fluid"
                style={{
                  width: "100%",
                  height: "380px",
                  objectFit: "cover",
                  border: "1px solid rgba(91,137,181,0.15)",
                }}
              />
            </div>
            <div className="col-12 col-lg-6">
              <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
                I ❤ Clouds started with a simple idea — a room that feels like
                the inside of a quiet afternoon sky. Soft light, unhurried
                service, and food made with care, not spectacle.
              </p>
              <p style={{ color: "#64748B", fontSize: "0.95rem" }}>
                Every table here is a small invitation to slow down. We built
                this place for people who want a good meal and a moment of
                stillness in the same breath.
              </p>

              <div className="row mt-4 g-3">
                <div className="col-6">
                  <h3
                    style={{
                      color: "#5B89B5",
                      fontFamily: "Playfair Display, serif",
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    }}
                  >
                    8+
                  </h3>
                  <p style={{ color: "#64748B", fontSize: "0.9rem" }}>
                    Years of Service
                  </p>
                </div>
                <div className="col-6">
                  <h3
                    style={{
                      color: "#5B89B5",
                      fontFamily: "Playfair Display, serif",
                      fontSize: "clamp(1.5rem, 4vw, 2rem)",
                    }}
                  >
                    50+
                  </h3>
                  <p style={{ color: "#64748B", fontSize: "0.9rem" }}>
                    Signature Dishes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4 py-md-5">
          <div className="text-center mb-5">
            <span
              style={{
                color: "#5B89B5",
                fontWeight: 600,
                letterSpacing: "2px",
                fontSize: "0.85rem",
              }}
            >
              WHY CHOOSE US
            </span>
            <h2
              className="fw-bold mt-2 px-3"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              }}
            >
              The Little Things We Get Right
            </h2>
          </div>

          <div className="row g-4 text-center">
            {[
              {
                icon: "🌿",
                title: "Ingredients That Matter",
                desc: "Sourced fresh, daily, from growers we trust",
              },
              {
                icon: "☁️",
                title: "A Room to Breathe In",
                desc: "Soft light and open space, made for lingering",
              },
              {
                icon: "👨‍🍳",
                title: "Quiet Craft",
                desc: "Recipes shaped by years of getting it right",
              },
            ].map((item, i) => (
              <div className="col-12 col-md-4" key={i}>
                <div className="fs-1 mb-3">{item.icon}</div>
                <h5
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "1.1rem",
                  }}
                >
                  {item.title}
                </h5>
                <p style={{ color: "#64748B", fontSize: "0.9rem" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#EAF1F8" }}>
        <div className="container py-4 py-md-5">
          <div className="text-center mb-5">
            <span
              style={{
                color: "#5B89B5",
                fontWeight: 600,
                letterSpacing: "2px",
                fontSize: "0.85rem",
              }}
            >
              TESTIMONIALS
            </span>
            <h2
              className="fw-bold mt-2 px-3"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
              }}
            >
              What Our Guests Say
            </h2>
          </div>

          <div className="row g-4">
            {[
              {
                name: "Ayesha Afzaal",
                role: "Regular Guest",
                text: "It's the quietest kind of luxury — soft light, easy service, food that doesn't try too hard to impress.",
              },
              {
                name: "Ali Hassan",
                role: "Food Blogger",
                text: "Every plate felt considered. The risotto in particular is worth the trip on its own.",
              },
              {
                name: "Maham Gull",
                role: "First-time Visitor",
                text: "I came for dinner and stayed for the calm. It's become my go-to for a slow evening.",
              },
              {
                name: "Hashir Raza",
                role: "Local Guide",
                text: "A genuinely peaceful find. The light and the greenery make it feel like its own small world.",
              },
            ].map((review, i) => (
              <div className="col-12 col-sm-6 col-lg-3" key={i}>
                <div
                  className="rounded-4 p-4 h-100 testimonial-card"
                  style={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid rgba(91,137,181,0.15)",
                  }}
                >
                  <div
                    className="mb-3"
                    style={{ color: "#C9A659", fontSize: "1.2rem" }}
                  >
                    ★★★★★
                  </div>
                  <p
                    style={{
                      color: "#64748B",
                      fontSize: "0.9rem",
                      minHeight: "100px",
                    }}
                  >
                    "{review.text}"
                  </p>
                  <div className="d-flex align-items-center gap-3 mt-4">
                    <div
                      className="rounded-circle flex-shrink-0"
                      style={{
                        width: "42px",
                        height: "42px",
                        backgroundColor: "#EAF1F8",
                        border: "1px solid rgba(91,137,181,0.3)",
                      }}
                    ></div>
                    <div>
                      <h6
                        className="mb-0"
                        style={{ color: "#2D3B4E", fontSize: "0.9rem" }}
                      >
                        {review.name}
                      </h6>
                      <small style={{ color: "#94A3B8" }}>{review.role}</small>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
