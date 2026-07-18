import React, { useEffect, useState } from "react";

function SplashScreen({ onEnter }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Enter") triggerEnter();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const triggerEnter = () => {
    setFadeOut(true);
    setTimeout(onEnter, 500);
  };

  return (
    <div
      onClick={triggerEnter}
      style={{
        height: "100vh",
        width: "100vw",
        background: "radial-gradient(circle at 50% 40%, #EAF1F8, #F7FAFD)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: "15%", left: "10%", width: "180px", height: "100px", opacity: 0.6 }}>
        <svg viewBox="0 0 200 110" width="100%" height="100%">
          <ellipse cx="60" cy="70" rx="55" ry="35" fill="#FFFFFF" />
          <ellipse cx="110" cy="55" rx="65" ry="42" fill="#FFFFFF" />
        </svg>
      </div>
      <div style={{ position: "absolute", bottom: "12%", right: "8%", width: "150px", height: "85px", opacity: 0.5 }}>
        <svg viewBox="0 0 200 110" width="100%" height="100%">
          <ellipse cx="60" cy="70" rx="55" ry="35" fill="#FFFFFF" />
          <ellipse cx="110" cy="55" rx="65" ry="42" fill="#FFFFFF" />
        </svg>
      </div>

      <div style={{ width: "60px", height: "1px", backgroundColor: "#C9A659", marginBottom: "20px" }}></div>

      <h1
        style={{
          fontFamily: "Playfair Display, serif",
          color: "#2D3B4E",
          fontSize: "3rem",
          letterSpacing: "3px",
          marginBottom: "10px",
        }}
      >
        I <span style={{ color: "#5B89B5" }}>❤</span> Clouds
      </h1>

      <div style={{ width: "60px", height: "1px", backgroundColor: "#C9A659", marginTop: "10px" }}></div>

      <p
        style={{
          color: "#64748B",
          marginTop: "30px",
          fontSize: "0.9rem",
          letterSpacing: "2px",
          animation: "blink 1.5s infinite",
        }}
      >
        PRESS ENTER TO STEP IN
      </p>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;