import React, { createContext, useContext, useState, useEffect } from "react";

const LoyaltyContext = createContext();

const POINTS_PER_BOOKING = 10;
const REWARD_THRESHOLD = 50; 

export function LoyaltyProvider({ children }) {
  const [points, setPoints] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("clouds_loyalty");
    if (saved) setPoints(JSON.parse(saved));
  }, []);

  const save = (updated) => {
    setPoints(updated);
    localStorage.setItem("clouds_loyalty", JSON.stringify(updated));
  };

  const addPoints = (email) => {
    const current = points[email] || 0;
    save({ ...points, [email]: current + POINTS_PER_BOOKING });
  };

  const getPoints = (email) => points[email] || 0;

  const getProgress = (email) => {
    const current = getPoints(email);
    return Math.min((current % REWARD_THRESHOLD) / REWARD_THRESHOLD * 100, 100);
  };

  const getRewardsAvailable = (email) => Math.floor(getPoints(email) / REWARD_THRESHOLD);

  const redeemReward = (email) => {
    const current = points[email] || 0;
    if (current >= REWARD_THRESHOLD) {
      save({ ...points, [email]: current - REWARD_THRESHOLD });
      return true;
    }
    return false;
  };

  return (
    <LoyaltyContext.Provider
      value={{ addPoints, getPoints, getProgress, getRewardsAvailable, redeemReward, POINTS_PER_BOOKING, REWARD_THRESHOLD }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  return useContext(LoyaltyContext);
}