import React from "react";

function CloudDecor({ top = "10%", left = "10%", size = 200, delay = "0s", opacity = 0.5 }) {
  return (
    <div
      className="cloud-float"
      style={{
        position: "absolute",
        top,
        left,
        width: `${size}px`,
        height: `${size * 0.55}px`,
        pointerEvents: "none",
        animationDelay: delay,
        zIndex: 0,
      }}
    >
      <svg viewBox="0 0 200 110" width="100%" height="100%">
        <ellipse cx="60" cy="70" rx="55" ry="35" fill="#FFFFFF" opacity={opacity} />
        <ellipse cx="110" cy="55" rx="65" ry="42" fill="#FFFFFF" opacity={opacity} />
        <ellipse cx="150" cy="72" rx="45" ry="30" fill="#C9A659" opacity={opacity * 0.4} />
      </svg>
    </div>
  );
}

export default CloudDecor;