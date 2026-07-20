import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

const WaitlistContext = createContext();

export function WaitlistProvider({ children }) {
  const [waitlist, setWaitlist] = useState([]);

  const fetchUserWaitlist = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/waitlist/user/${userId}`);
      const data = await res.json();
      setWaitlist(data);
      return data;
    } catch (error) {
      console.error("Failed to fetch waitlist:", error);
      return [];
    }
  };

  const joinWaitlist = async (entry) => {
    try {
      const res = await fetch(`${API_URL}/waitlist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: entry.userId,
          name: entry.name,
          phone: entry.phone,
          date: entry.date,
          time: entry.time,
          guests: entry.guests,
        }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchUserWaitlist(entry.userId);
      }
      return data;
    } catch (error) {
      return { success: false, message: "Could not connect to server." };
    }
  };

  const getUserWaitlist = (userId) => {
    return waitlist.filter((w) => w.userId === userId && w.status !== "cancelled");
  };

  const notifyWaitlistForSlot = async (date, time) => {
    try {
      await fetch(`${API_URL}/waitlist/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time }),
      });
    } catch (error) {
      console.error("Failed to notify waitlist:", error);
    }
  };

  const removeFromWaitlist = async (waitlistId, userId) => {
    try {
      await fetch(`${API_URL}/waitlist/${waitlistId}/cancel`, {
        method: "PATCH",
      });
      await fetchUserWaitlist(userId);
    } catch (error) {
      console.error("Failed to remove from waitlist:", error);
    }
  };

  return (
    <WaitlistContext.Provider
      value={{ waitlist, joinWaitlist, getUserWaitlist, notifyWaitlistForSlot, removeFromWaitlist, fetchUserWaitlist }}
    >
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  return useContext(WaitlistContext);
}