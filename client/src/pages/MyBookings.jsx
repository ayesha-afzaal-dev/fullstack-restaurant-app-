import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTables } from "../context/TableContext";
import { useLoyalty } from "../context/LoyaltyContext";
import { useWaitlist } from "../context/WaitlistContext";
import { useToast } from "../context/ToastContext";

function MyBookings() {
  const { user } = useAuth();
  const { getUserBookings, cancelBooking, canCancel } = useTables();
  const { getPoints, getProgress, getRewardsAvailable, redeemReward, REWARD_THRESHOLD } = useLoyalty();
  const { getUserWaitlist, removeFromWaitlist, notifyWaitlistForSlot } = useWaitlist();
  const { showToast } = useToast();

  if (!user) {
    return <Navigate to="/login" state={{ from: "/my-bookings" }} replace />;
  }

  const myBookings = getUserBookings(user.email);
  const myWaitlist = getUserWaitlist(user.email);
  const points = getPoints(user.email);
  const progress = getProgress(user.email);
  const rewardsAvailable = getRewardsAvailable(user.email);

  
  const handleCancel = (booking) => {
    if (window.confirm("Do you really want to cancel this booking?")) {
      cancelBooking(booking.id);
      notifyWaitlistForSlot(booking.date, booking.time);
      showToast("Booking cancel ho gayi", "success");
    }
  };

  const handleRedeem = () => {
    const success = redeemReward(user.email);
    if (success) showToast("Reward has been redeemed! Let us know on your next visit 🎁", "success");
  };

  return (
    <div style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif", minHeight: "80vh" }}>
      <section className="py-5" style={{ paddingTop: "100px" }}>
        <div className="container">
          <h2 className="mb-4" style={{ fontFamily: "Playfair Display, serif" }}>My Bookings</h2>

          {/* ===== Loyalty Points Card ===== */}
          <div className="rounded-4 p-4 mb-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(201,166,89,0.3)" }}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0" style={{ fontFamily: "Playfair Display, serif", color: "#C9A659" }}>Loyalty Points</h5>
              <span style={{ color: "#2D3B4E", fontWeight: 700 }}>{points} pts</span>
            </div>

            <div className="progress mb-2" style={{ height: "8px", backgroundColor: "#EAF1F8" }}>
              <div className="progress-bar" style={{ width: `${progress}%`, backgroundColor: "#C9A659" }}></div>
            </div>

            <p style={{ color: "#64748B", fontSize: "0.85rem" }} className="mb-2">
              {REWARD_THRESHOLD - (points % REWARD_THRESHOLD)} Points till next reward
            </p>

            {rewardsAvailable > 0 && (
              <button className="btn btn-sm" style={{ backgroundColor: "#C9A659", color: "#fff" }} onClick={handleRedeem}>
                Redeem Reward ({rewardsAvailable} available) 🎁
              </button>
            )}
          </div>

          {/* ===== Waitlist Section ===== */}
          {myWaitlist.length > 0 && (
            <>
              <h4 className="mb-3" style={{ fontFamily: "Playfair Display, serif" }}>My Waitlist</h4>
              <div className="row g-3 mb-5">
                {myWaitlist.map((w) => (
                  <div className="col-md-6 col-lg-4" key={w.id}>
                    <div
                      className="rounded-4 p-4 h-100"
                      style={{
                        backgroundColor: "#FFFFFF",
                        border: w.status === "table_available" ? "1px solid #2E9E5A" : "1px solid rgba(91,137,181,0.15)",
                      }}
                    >
                      <p className="mb-1" style={{ color: "#64748B" }}>📅 {w.date} at {w.time}</p>
                      <p className="mb-2" style={{ color: "#64748B" }}>👥 {w.guests} Guests</p>

                      {w.status === "table_available" ? (
                        <p style={{ color: "#2E9E5A", fontWeight: 600, fontSize: "0.85rem" }}>
                          ✓ Table available! Go to the reservation page and book it.
                        </p>
                      ) : (
                        <p style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Waiting for a table...</p>
                      )}

                      <button
                        className="btn btn-sm mt-2"
                        style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
                        onClick={() => removeFromWaitlist(w.id)}
                      >
                        Remove from Waitlist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===== Bookings ===== */}
          <h4 className="mb-3" style={{ fontFamily: "Playfair Display, serif" }}>My Reservations</h4>
          {myBookings.length === 0 ? (
            <p style={{ color: "#64748B" }}>No booking has been made yet.</p>
          ) : (
            <div className="row g-4">
              {myBookings.map((booking) => (
                <div className="col-md-6 col-lg-4" key={booking.id}>
                  <div className="rounded-4 p-4 h-100" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
                    <h5 style={{ fontFamily: "Playfair Display, serif" }}>Table {booking.tableNumber}</h5>
                    <p className="mb-1" style={{ color: "#64748B" }}>📅 {booking.date} at {booking.time}</p>
                    <p className="mb-1" style={{ color: "#64748B" }}>👥 {booking.guests} Guests</p>
                    {booking.notes && <p className="mb-3" style={{ color: "#94A3B8", fontSize: "0.85rem" }}>Note: {booking.notes}</p>}

                    {canCancel(booking) ? (
                      <button
                        className="btn btn-sm w-100"
                        style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
                        onClick={() => handleCancel(booking)}
                      >
                        Cancel Booking
                      </button>
                    ) : (
                      <p className="mb-0" style={{ color: "#94A3B8", fontSize: "0.8rem" }}>
                        Cancellation window closed (less than 2 hours left)
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MyBookings;