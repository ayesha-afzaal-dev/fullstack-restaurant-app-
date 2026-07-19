import React from "react";
import { Link } from "react-router-dom";
import CloudDecor from "../components/CloudDecor";
import PlantDecor from "../components/PlantDecor";
import useScrollReveal from "../hooks/useScrollReveal";
import usePageTitle from "../hooks/usePageTitle";
import heroImg from "../assets/images/homepage.jpg";

function Home() {
  usePageTitle("Home");
  const [heroRef, heroVisible] = useScrollReveal();

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
      <section
        className="d-flex align-items-center position-relative"
        style={{
          minHeight: "90vh",
          background:
            "radial-gradient(circle at 30% 30%, #EAF1F8, #F7FAFD 70%)",
          overflow: "hidden",
          padding: "40px 0",
        }}
      >
        <CloudDecor top="8%" left="5%" size={160} delay="0s" />
        <CloudDecor top="60%" left="78%" size={130} delay="2s" opacity={0.4} />
        <PlantDecor position="bottom-left" size={110} opacity={0.35} />

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-4">
            {/* ===== Left: Text ===== */}
            <div
              ref={heroRef}
              className={`col-lg-6 text-center text-lg-start reveal ${heroVisible ? "visible" : ""}`}
            >
              <span
                className="badge rounded-pill px-3 py-2 mb-3"
                style={{
                  backgroundColor: "#EAF1F8",
                  color: "#5B89B5",
                  border: "1px solid rgba(91,137,181,0.3)",
                  fontSize: "0.8rem",
                }}
              >
                ☁️ Light, Airy, Unhurried
              </span>

              <h1
                className="fw-bold mb-3"
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
                  lineHeight: 1.2,
                }}
              >
                Dine Somewhere{" "}
                <span style={{ color: "#5B89B5" }}>Above the Noise</span>
              </h1>

              <p
                className="mb-4"
                style={{
                  color: "#64748B",
                  fontSize: "clamp(0.9rem, 2vw, 1.15rem)",
                }}
              >
                I ❤ Clouds is a quiet corner where soft light, gentle textures,
                and thoughtfully made food come together — a pause from the
                everyday, wrapped in calm.
              </p>

              <div className="d-flex gap-3 justify-content-center justify-content-lg-start flex-wrap">
                <Link
                  to="/menu"
                  className="btn rounded-3 px-4 py-2"
                  style={{
                    backgroundColor: "#5B89B5",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  Explore the Menu
                </Link>
                <Link
                  to="/reservation"
                  className="btn rounded-3 px-4 py-2"
                  style={{
                    backgroundColor: "transparent",
                    color: "#2D3B4E",
                    border: "1px solid rgba(45,59,78,0.25)",
                  }}
                >
                  Reserve a Table
                </Link>
              </div>
            </div>

            {/* ===== Right: Image ===== */}
            <div className="col-lg-6">
              <img
                src={heroImg}
                alt="Signature dish at I Love Clouds restaurant"
                className="img-fluid rounded-4"
                style={{
                  width: "100%",
                  maxHeight: "450px",
                  objectFit: "cover",
                  boxShadow: "0 20px 40px rgba(91,137,181,0.15)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
