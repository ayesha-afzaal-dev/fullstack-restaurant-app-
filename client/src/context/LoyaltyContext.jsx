import React, { createContext, useContext, useState } from "react";
import { API_URL } from "../config";

const LoyaltyContext = createContext();

const REWARD_THRESHOLD = 50;
const POINTS_PER_BOOKING = 10;

export function LoyaltyProvider({ children }) {
  const [pointsData, setPointsData] = useState({});

  const fetchPoints = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/loyalty/${userId}`);
      const data = await res.json();
      setPointsData((prev) => ({ ...prev, [userId]: data.points }));
      return data.points;
    } catch (error) {
      console.error("Failed to fetch loyalty points:", error);
      return 0;
    }
  };

  const addPoints = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/loyalty/${userId}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points: POINTS_PER_BOOKING }),
      });
      const data = await res.json();
      if (data.success) {
        setPointsData((prev) => ({ ...prev, [userId]: data.loyalty.points }));
      }
    } catch (error) {
      console.error("Failed to add points:", error);
    }
  };

  const getPoints = (userId) => pointsData[userId] || 0;

  const getProgress = (userId) => {
    const current = getPoints(userId);
    return Math.min(((current % REWARD_THRESHOLD) / REWARD_THRESHOLD) * 100, 100);
  };

  const getRewardsAvailable = (userId) => Math.floor(getPoints(userId) / REWARD_THRESHOLD);

  const redeemReward = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/loyalty/${userId}/redeem`, {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setPointsData((prev) => ({ ...prev, [userId]: data.loyalty.points }));
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return (
    <LoyaltyContext.Provider
      value={{ addPoints, getPoints, getProgress, getRewardsAvailable, redeemReward, fetchPoints, REWARD_THRESHOLD }}
    >
      {children}
    </LoyaltyContext.Provider>
  );
}

export function useLoyalty() {
  return useContext(LoyaltyContext);
}