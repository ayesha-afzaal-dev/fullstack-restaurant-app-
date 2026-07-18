import React, { createContext, useContext, useState, useEffect } from "react";

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem("clouds_reviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  const addRating = (dishName, rating) => {
    const existing = reviews[dishName] || { total: 0, count: 0 };
    const updated = {
      ...reviews,
      [dishName]: { total: existing.total + rating, count: existing.count + 1 },
    };
    setReviews(updated);
    localStorage.setItem("clouds_reviews", JSON.stringify(updated));
  };

  const getAverage = (dishName) => {
    const data = reviews[dishName];
    if (!data || data.count === 0) return null;
    return (data.total / data.count).toFixed(1);
  };

  const getCount = (dishName) => reviews[dishName]?.count || 0;

  return (
    <ReviewContext.Provider value={{ addRating, getAverage, getCount }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  return useContext(ReviewContext);
}