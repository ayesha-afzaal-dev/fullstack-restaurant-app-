import React, { useState, useEffect } from "react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "#5B89B5",
        color: "#fff",
        border: "none",
        fontSize: "1.2rem",
        boxShadow: "0 8px 20px rgba(91,137,181,0.3)",
        zIndex: 999,
      }}
    >
      ↑
    </button>
  );
}

export default ScrollToTop;