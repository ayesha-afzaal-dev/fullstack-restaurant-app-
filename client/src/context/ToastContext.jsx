import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 9999, display: "flex", flexDirection: "column", gap: "10px" }}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="reveal visible"
            style={{
              backgroundColor: toast.type === "error" ? "#C0392B" : "#5B89B5",
              color: "#fff",
              padding: "14px 20px",
              borderRadius: "10px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              minWidth: "260px",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.9rem",
            }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}