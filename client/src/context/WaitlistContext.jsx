import React, { createContext, useContext, useState, useEffect } from "react";

const WaitlistContext = createContext();

export function WaitlistProvider({ children }) {
  const [waitlist, setWaitlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("clouds_waitlist");
    if (saved) setWaitlist(JSON.parse(saved));
  }, []);

  const save = (updated) => {
    setWaitlist(updated);
    localStorage.setItem("clouds_waitlist", JSON.stringify(updated));
  };

  const joinWaitlist = (entry) => {
    const newEntry = {
      id: `W${Date.now()}`,
      ...entry,
      status: "waiting", // waiting -> table_available -> cancelled
      createdAt: new Date().toISOString(),
    };
    save([...waitlist, newEntry]);
    return newEntry;
  };

  const getUserWaitlist = (email) =>
    waitlist.filter((w) => w.email === email && w.status !== "cancelled");

  // Jab kisi date/time ki table cancel ho, uss slot ke waitlist walon ko "available" mark karna
  const notifyWaitlistForSlot = (date, time) => {
    const updated = waitlist.map((w) =>
      w.date === date && w.time === time && w.status === "waiting"
        ? { ...w, status: "table_available" }
        : w
    );
    save(updated);
  };

  const removeFromWaitlist = (id) => {
    const updated = waitlist.map((w) => (w.id === id ? { ...w, status: "cancelled" } : w));
    save(updated);
  };

  return (
    <WaitlistContext.Provider
      value={{ waitlist, joinWaitlist, getUserWaitlist, notifyWaitlistForSlot, removeFromWaitlist }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistContext);
}