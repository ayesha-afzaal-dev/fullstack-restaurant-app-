import React from "react";
import { Navigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAuth } from "../context/AuthContext";
import { useTables } from "../context/TableContext";
import usePageTitle from "../hooks/usePageTitle";

function AdminDashboard() {
  usePageTitle("Admin Dashboard")
  const { user } = useAuth();
  const { tables, getAllBookings, getUserBookings, cancelBooking, canCancel } = useTables();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const allBookings = getAllBookings();
  const myOwnBookings = getUserBookings(user.email);
  const today = new Date().toISOString().split("T")[0];
  const todaysBookings = allBookings.filter((b) => b.date === today);

  const chartData = tables.map((table) => ({
    name: `T${table.number}`,
    bookings: allBookings.filter((b) => b.tableId === table.id).length,
  }));

  const handleCancel = (bookingId) => {
    if (window.confirm("Yeh booking cancel karni hai?")) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="page-fade" style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif", minHeight: "80vh" }}>
      <section className="py-5" style={{ paddingTop: "100px" }}>
        <div className="container">
          <h2 className="mb-2" style={{ fontFamily: "Playfair Display, serif" }}>Admin Dashboard</h2>
          <p style={{ color: "#64748B" }} className="mb-4">Restaurant ki saari tables aur bookings ka overview</p>

          <div className="row g-3 mb-5">
            <div className="col-12 col-md-4">
              <div className="rounded-4 p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>TOTAL TABLES</p>
                <h2 style={{ color: "#2D3B4E", fontFamily: "Playfair Display, serif" }}>{tables.length}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-4 p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>BOOKED TODAY</p>
                <h2 style={{ color: "#5B89B5", fontFamily: "Playfair Display, serif" }}>{todaysBookings.length}</h2>
              </div>
            </div>
            <div className="col-md-4">
              <div className="rounded-4 p-4" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
                <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>TOTAL RESERVATIONS</p>
                <h2 style={{ color: "#C9A659", fontFamily: "Playfair Display, serif" }}>{allBookings.length}</h2>
              </div>
            </div>
          </div>

          <h4 className="mb-3" style={{ fontFamily: "Playfair Display, serif" }}>Table Status (Today)</h4>
          <div className="row g-3 mb-5">
            {tables.map((table) => {
              const isBookedToday = todaysBookings.some((b) => b.tableId === table.id);
              return (
                <div className="col-md-4 col-lg-2" key={table.id}>
                  <div
                    className="rounded-4 p-3 text-center"
                    style={{
                      backgroundColor: isBookedToday ? "#FEECEC" : "#EAF9F0",
                      border: `1px solid ${isBookedToday ? "rgba(192,57,43,0.3)" : "rgba(46,158,90,0.3)"}`,
                    }}
                  >
                    <strong>Table {table.number}</strong>
                    <p className="mb-0" style={{ fontSize: "0.75rem", color: "#64748B" }}>{table.location}</p>
                    <span
                      className="badge mt-2"
                      style={{ backgroundColor: isBookedToday ? "#C0392B" : "#2E9E5A", color: "#fff", fontSize: "0.7rem" }}
                    >
                      {isBookedToday ? "Booked" : "Available"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ===== TABLE POPULARITY CHART — YEH ABHI BHI YAHAN HAI ===== */}
          <h4 className="mb-3" style={{ fontFamily: "Playfair Display, serif" }}>Table Popularity</h4>
          <div className="rounded-4 p-4 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAF1F8" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #EAF1F8", borderRadius: "8px" }} />
                <Bar dataKey="bookings" fill="#5B89B5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {myOwnBookings.length > 0 && (
            <>
              <h4 className="mb-3" style={{ fontFamily: "Playfair Display, serif" }}>My Own Reservations</h4>
              <div className="row g-3 mb-5">
                {myOwnBookings.map((booking) => (
                  <div className="col-md-6 col-lg-4" key={booking.id}>
                    <div className="rounded-4 p-4 h-100" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(201,166,89,0.3)" }}>
                      <h6 style={{ fontFamily: "Playfair Display, serif" }}>Table {booking.tableNumber}</h6>
                      <p className="mb-1" style={{ color: "#64748B", fontSize: "0.9rem" }}>📅 {booking.date} at {booking.time}</p>
                      <p className="mb-2" style={{ color: "#64748B", fontSize: "0.9rem" }}>👥 {booking.guests} Guests</p>
                      {canCancel(booking) ? (
                        <button
                          className="btn btn-sm w-100"
                          style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
                          onClick={() => handleCancel(booking.id)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <p className="mb-0" style={{ color: "#94A3B8", fontSize: "0.75rem" }}>Cancellation window closed</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <h4 className="mb-3" style={{ fontFamily: "Playfair Display, serif" }}>All Reservations</h4>
          {allBookings.length === 0 ? (
            <p style={{ color: "#64748B" }}>No booking has been made yet. </p>
          ) : (
            <div className="table-responsive">
              <table className="table" style={{ backgroundColor: "#FFFFFF" }}>
                <thead>
                  <tr style={{ color: "#94A3B8", fontSize: "0.85rem" }}>
                    <th>Table</th>
                    <th>Guest Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Guests</th>
                    <th>Booked By</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((b) => (
                    <tr key={b.id} style={{ color: "#2D3B4E" }}>
                      <td>Table {b.tableNumber}</td>
                      <td>{b.name}</td>
                      <td>{b.date}</td>
                      <td>{b.time}</td>
                      <td>{b.guests}</td>
                      <td style={{ color: "#64748B", fontSize: "0.85rem" }}>{b.bookedBy}</td>
                      <td>
                        <button
                          className="btn btn-sm"
                          style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
                          onClick={() => handleCancel(b.id)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;