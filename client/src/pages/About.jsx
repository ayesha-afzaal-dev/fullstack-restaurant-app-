import React from "react";
import CloudDecor from "../components/CloudDecor";
import useScrollReveal from "../hooks/useScrollReveal";
import usePageTitle from "../hooks/usePageTitle";


function About() {
 usePageTitle("About Us")
  const [storyRef, storyVisible] = useScrollReveal();

  return (
    <div className="page-fade" style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif" }}>
      <section className="py-5 text-center position-relative" style={{ paddingTop: "100px", overflow: "hidden" }}>
        <CloudDecor top="10%" left="8%" size={160} delay="1s" opacity={0.4} />
        <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px" }}>OUR STORY</span>
        <h1 className="display-4 fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Built on Soft Light and Slow Mornings
        </h1>
      </section>

      <section className="py-5" style={{ backgroundColor: "#EAF1F8" }}>
        <div className="container py-5">
          <div ref={storyRef} className={`row align-items-center g-5 reveal ${storyVisible ? "visible" : ""}`}>
            <div className="col-lg-6">
              <div className="rounded-4" style={{ height: "380px", backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}></div>
            </div>
            <div className="col-lg-6">
              <p style={{ color: "#64748B" }}>
                I ❤ Clouds started with a simple idea — a room that feels like the
                inside of a quiet afternoon sky. Soft light, unhurried service, and
                food made with care, not spectacle.
              </p>
              <p style={{ color: "#64748B" }}>
                Every table here is a small invitation to slow down. We built this
                place for people who want a good meal and a moment of stillness
                in the same breath.
              </p>

              <div className="row mt-4 g-3">
                <div className="col-6">
                  <h3 style={{ color: "#5B89B5", fontFamily: "Playfair Display, serif" }}>8+</h3>
                  <p style={{ color: "#64748B" }}>Years of Service</p>
                </div>
                <div className="col-6">
                  <h3 style={{ color: "#5B89B5", fontFamily: "Playfair Display, serif" }}>50+</h3>
                  <p style={{ color: "#64748B" }}>Signature Dishes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5">
            <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px" }}>WHY CHOOSE US</span>
            <h2 className="fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>The Little Things We Get Right</h2>
          </div>

          <div className="row g-4 text-center">
            {[
              { icon: "🌿", title: "Ingredients That Matter", desc: "Sourced fresh, daily, from growers we trust" },
              { icon: "☁️", title: "A Room to Breathe In", desc: "Soft light and open space, made for lingering" },
              { icon: "👨‍🍳", title: "Quiet Craft", desc: "Recipes shaped by years of getting it right" },
            ].map((item, i) => (
              <div className="col-md-4" key={i}>
                <div className="fs-1 mb-3">{item.icon}</div>
                <h5 style={{ fontFamily: "Playfair Display, serif" }}>{item.title}</h5>
                <p style={{ color: "#64748B" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5" style={{ backgroundColor: "#EAF1F8" }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px" }}>TESTIMONIALS</span>
            <h2 className="fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>What Our Guests Say</h2>
          </div>

          <div className="row g-4">
            {[
              { name: "Ayesha Afzaal", role: "Regular Guest", text: "It's the quietest kind of luxury — soft light, easy service, food that doesn't try too hard to impress." },
              { name: "Ali Hassan", role: "Food Blogger", text: "Every plate felt considered. The risotto in particular is worth the trip on its own." },
              { name: "Maham Gull", role: "First-time Visitor", text: "I came for dinner and stayed for the calm. It's become my go-to for a slow evening." },
              { name: "Kashmala Mirza", role: "Local Guide", text: "A genuinely peaceful find. The light and the greenery make it feel like its own small world." },
            ].map((review, i) => (
              <div className="col-md-6 col-lg-3" key={i}>
                <div className="rounded-4 p-4 h-100" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
                  <div className="mb-3" style={{ color: "#C9A659", fontSize: "1.3rem" }}>★★★★★</div>
                  <p style={{ color: "#64748B", fontSize: "0.95rem", minHeight: "110px" }}>"{review.text}"</p>
                  <div className="d-flex align-items-center gap-3 mt-4">
                    <div className="rounded-circle" style={{ width: "42px", height: "42px", backgroundColor: "#EAF1F8", border: "1px solid rgba(91,137,181,0.3)" }}></div>
                    <div>
                      <h6 className="mb-0" style={{ color: "#2D3B4E" }}>{review.name}</h6>
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