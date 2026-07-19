import React from "react";
import { Link } from "react-router-dom";
import CloudDecor from "../components/CloudDecor";
import useScrollReveal from "../hooks/useScrollReveal";
import PlantDecor from "../components/PlantDecor";
import usePageTitle from "../hooks/usePageTitle";


function Home() {
  usePageTitle("Home");
  const [heroRef, heroVisible] = useScrollReveal();

  return (
    <div className="page-fade" style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif" }}>
      <section
        className="d-flex align-items-center position-relative"
        style={{
          minHeight: "90vh",
          background: "radial-gradient(circle at 30% 30%, #EAF1F8, #F7FAFD 70%)",
          overflow: "hidden",
        }}
      >
        <CloudDecor top="8%" left="5%" size={220} delay="0s" />
        <CloudDecor top="60%" left="78%" size={180} delay="2s" opacity={0.4} />
        <CloudDecor top="20%" left="60%" size={140} delay="4s" opacity={0.45} />
        <PlantDecor position="bottom-left" size={150} opacity={0.4} />

        <div
          ref={heroRef}
          className={`container position-relative text-center reveal ${heroVisible ? "visible" : ""}`}
          style={{ zIndex: 1 }}
        >
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{ backgroundColor: "#EAF1F8", color: "#5B89B5", border: "1px solid rgba(91,137,181,0.3)" }}
          >
            ☁️ Light, Airy, Unhurried
          </span>

          <h1 className="display-3 fw-bold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>
            Dine Somewhere <span style={{ color: "#5B89B5" }}>Above the Noise</span>
          </h1>

          <p className="fs-5 mb-4 mx-auto" style={{ color: "#64748B", maxWidth: "540px" }}>
            I ❤ Clouds is a quiet corner where soft light, gentle textures, and
            thoughtfully made food come together — a pause from the everyday, wrapped in calm.
          </p>

          <div className="d-flex gap-3 justify-content-center flex-wrap">
            <Link to="/menu" className="btn btn-lg rounded-3 px-4" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
              Explore the Menu
            </Link>
            <Link to="/reservation" className="btn btn-lg rounded-3 px-4" style={{ backgroundColor: "transparent", color: "#2D3B4E", border: "1px solid rgba(45,59,78,0.25)" }}>
              Reserve a Table
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;