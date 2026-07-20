import React, { createContext, useContext, useState } from "react";
import { API_URL } from "../config";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviewCache, setReviewCache] = useState({});

  const fetchDishReviews = async (dishName) => {
    try {
      const res = await fetch(`${API_URL}/reviews/${encodeURIComponent(dishName)}`);
      const data = await res.json();
      setReviewCache((prev) => ({ ...prev, [dishName]: data }));
      return data;
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
      return { average: null, count: 0 };
    }
  };

  const addRating = async (dishName, rating, userId) => {
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dishName, rating, userId }),
      });
      const data = await res.json();

      if (data.success) {
        await fetchDishReviews(dishName);
      }
    } catch (error) {
      console.error("Failed to add rating:", error);
    }
  };

  const getAverage = (dishName) => {
    const data = reviewCache[dishName];
    return data?.average ?? null;
  };

  const getCount = (dishName) => {
    const data = reviewCache[dishName];
    return data?.count || 0;
  };

  return (
    <ReviewContext.Provider value={{ addRating, getAverage, getCount, fetchDishReviews }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}