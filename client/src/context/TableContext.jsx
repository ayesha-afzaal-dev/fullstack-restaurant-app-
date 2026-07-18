import React, { createContext, useContext, useState, useEffect } from "react";

const TableContext = createContext();

const DEFAULT_TABLES = [
  { id: "T1", number: 1, capacity: 2, location: "Window Side", x: 15, y: 20 },
  { id: "T2", number: 2, capacity: 2, location: "Window Side", x: 15, y: 60 },
  { id: "T3", number: 3, capacity: 4, location: "Main Hall", x: 45, y: 25 },
  { id: "T4", number: 4, capacity: 4, location: "Main Hall", x: 45, y: 65 },
  { id: "T5", number: 5, capacity: 6, location: "Garden Area", x: 75, y: 20 },
  { id: "T6", number: 6, capacity: 8, location: "Private Corner", x: 75, y: 65 },
];

export function TableProvider({ children }) {
  const [tables] = useState(DEFAULT_TABLES);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("clouds_bookings");
    if (saved) setBookings(JSON.parse(saved));
  }, []);

  const saveBookings = (updated) => {
    setBookings(updated);
    localStorage.setItem("clouds_bookings", JSON.stringify(updated));
  };

  // Kisi specific date+time pe kaunsi tables khaali hain
  const getAvailableTables = (date, time) => {
    const bookedTableIds = bookings
      .filter((b) => b.date === date && b.time === time && b.status === "confirmed")
      .map((b) => b.tableId);

    return tables.filter((t) => !bookedTableIds.includes(t.id));
  };

  const createBooking = (bookingData) => {
    const newBooking = {
      id: `B${Date.now()}`,
      ...bookingData,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };
    saveBookings([...bookings, newBooking]);
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "cancelled" } : b
    );
    saveBookings(updated);
  };

  // Check: kya yeh booking abhi cancel ki ja sakti hai (2 ghante ka rule)
  const canCancel = (booking) => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    const now = new Date();
    const hoursDiff = (bookingDateTime - now) / (1000 * 60 * 60);
    return hoursDiff >= 2;
  };

  const getUserBookings = (email) =>
    bookings.filter((b) => b.bookedBy === email && b.status === "confirmed");

  const getAllBookings = () => bookings.filter((b) => b.status === "confirmed");

  return (
    <TableContext.Provider
      value={{
        tables,
        bookings,
        getAvailableTables,
        createBooking,
        cancelBooking,
        canCancel,
        getUserBookings,
        getAllBookings,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTables() {
  return useContext(TableContext);
}