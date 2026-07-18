import React from "react";

// Halki si greenery accent — corners ya section edges mein use hoti hai
function PlantDecor({ position = "bottom-left", size = 140, opacity = 0.5 }) {
  const positions = {
    "bottom-left": { bottom: "0", left: "0" },
    "bottom-right": { bottom: "0", right: "0" },
    "top-left": { top: "0", left: "0" },
    "top-right": { top: "0", right: "0" },
  };

  return (
    <div
      style={{
        position: "absolute",
        ...positions[position],
        width: `${size}px`,
        height: `${size}px`,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
      }}
    >
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <path d="M50 100 C 50 70, 30 60, 20 40 C 15 55, 25 75, 50 100" fill="#8FB39C" />
        <path d="M50 100 C 50 65, 70 55, 80 35 C 85 50, 75 72, 50 100" fill="#5B89B5" opacity="0.6" />
        <path d="M50 100 C 50 80, 45 65, 40 50 C 35 65, 42 82, 50 100" fill="#C9A659" opacity="0.5" />
      </svg>
    </div>
  );
}

export default PlantDecor;