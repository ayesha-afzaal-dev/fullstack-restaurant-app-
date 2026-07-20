import React, { createContext, useContext, useState, useEffect } from "react";
import { API_URL } from "../config";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tables, setTables] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchTables();
    fetchAllBookings();
  }, []);

  const fetchTables = async () => {
    try {
      const res = await fetch(`${API_URL}/tables`);
      const data = await res.json();

      const positions = [
        { x: 15, y: 20 },
        { x: 15, y: 60 },
        { x: 45, y: 25 },
        { x: 45, y: 65 },
        { x: 75, y: 20 },
        { x: 75, y: 65 },
      ];

      const tablesWithPosition = data.map((t, i) => ({
        ...t,
        x: positions[i]?.x || 50,
        y: positions[i]?.y || 50,
      }));

      setTables(tablesWithPosition);
    } catch (error) {
      console.error("Failed to fetch tables:", error);
    }
  };

  const fetchAllBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const getAvailableTables = async (date, time) => {
    try {
      const res = await fetch(`${API_URL}/bookings/available?date=${date}&time=${time}`);
      const data = await res.json();

      return data.map((t) => {
        const fullTable = tables.find((table) => table.id === t.id);
        return fullTable || t;
      });
    } catch (error) {
      console.error("Failed to check availability:", error);
      return [];
    }
  };

  const createBooking = async (bookingData) => {
    try {
      const res = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableId: bookingData.tableId,
          userId: bookingData.userId,
          name: bookingData.name,
          phone: bookingData.phone,
          date: bookingData.date,
          time: bookingData.time,
          guests: bookingData.guests,
          notes: bookingData.notes,
        }),
      });

      const data = await res.json();

      if (data.success) {
        await fetchAllBookings();
        return { success: true, booking: data.booking };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Could not connect to server." };
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const res = await fetch(`${API_URL}/bookings/${bookingId}/cancel`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (data.success) {
        await fetchAllBookings();
      }
      return data;
    } catch (error) {
      return { success: false, message: "Could not connect to server." };
    }
  };

  const canCancel = (booking) => {
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    const now = new Date();
    const hoursDiff = (bookingDateTime - now) / (1000 * 60 * 60);
    return hoursDiff >= 2;
  };

  const getUserBookings = (userId) =>
    bookings.filter((b) => b.userId === userId && b.status === "confirmed");

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
        fetchAllBookings,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTables() {
  return useContext(TableContext);
}