import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { useAuth } from "../context/AuthContext";
import { useTables } from "../context/TableContext";
import { useToast } from "../context/ToastContext";
import { useWaitlist } from "../context/WaitlistContext";
import { useLoyalty } from "../context/LoyaltyContext";
import TableMap from "./TableMap";

function ReservationForm() {
  const { user, logout } = useAuth();
  const { getAvailableTables, createBooking, tables } = useTables();
  const { showToast } = useToast();
  const { joinWaitlist } = useWaitlist();
  const { addPoints } = useLoyalty();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [availableTables, setAvailableTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    const available = getAvailableTables(formData.date, formData.time);
    setAvailableTables(available);
    setSelectedTable(null);
    setStep(2);
  };

  const handleConfirmBooking = () => {
    createBooking({
      ...formData,
      tableId: selectedTable.id,
      tableNumber: selectedTable.number,
      bookedBy: user.email,
    });

    addPoints(user.email);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#5B89B5", "#C9A659", "#EAF1F8"],
    });

    showToast(`Table ${selectedTable.number} reserved! +10 loyalty points earned`, "success");
    setSubmitted(true);
  };

  const handleJoinWaitlist = () => {
    joinWaitlist({
      name: formData.name,
      email: user.email,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      guests: formData.guests,
    });
    setJoinedWaitlist(true);
    showToast("Waitlist mein add ho gaye — jaise hi table free hogi, 'My Bookings' pe dikh jayega", "success");
  };

  if (submitted) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center text-center" style={{ minHeight: "70vh", backgroundColor: "#F7FAFD", color: "#2D3B4E" }}>
        <div style={{ fontSize: "3rem", marginBottom: "10px" }}>☁️</div>
        <h2 style={{ fontFamily: "Playfair Display, serif" }}>Your Table Is Set</h2>
        <p style={{ color: "#64748B" }}>
          Table {selectedTable.number} ({selectedTable.location}) reserved for {formData.date} at {formData.time}.
        </p>
        <p style={{ color: "#C9A659", fontWeight: 600 }}>+10 Loyalty Points Earned 🎉</p>

        <div className="d-flex gap-3 mt-4">
          <button className="btn px-4" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }} onClick={() => navigate("/my-bookings")}>
            View My Bookings
          </button>
          <button
            className="btn px-4"
            style={{ backgroundColor: "transparent", color: "#C0392B", border: "1px solid rgba(192,57,43,0.4)" }}
            onClick={() => { logout(); navigate("/signup"); }}
          >
            Logout & Use Different Account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex align-items-center justify-content-center py-5" style={{ minHeight: "80vh", backgroundColor: "#F7FAFD" }}>
      <div className="p-4 rounded-4" style={{ width: "540px", maxWidth: "92%", backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
        <h3 className="mb-4 text-center" style={{ color: "#2D3B4E", fontFamily: "Playfair Display, serif" }}>
          {step === 1 ? "Reserve Your Table" : "Choose Your Table"}
        </h3>

        {step === 1 && (
          <form onSubmit={handleCheckAvailability}>
            <div className="row g-3">
              <div className="col-12">
                <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
              </div>
              <div className="col-12">
                <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="form-control mt-1" style={inputStyle} placeholder="03XX-XXXXXXX" />
              </div>
              <div className="col-6">
                <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Date</label>
                <input type="date" name="date" required value={formData.date} onChange={handleChange} className="form-control mt-1" style={inputStyle} min={new Date().toISOString().split("T")[0]} />
              </div>
              <div className="col-6">
                <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Time</label>
                <input type="time" name="time" required value={formData.time} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
              </div>
              <div className="col-12">
                <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Number of Guests</label>
                <select name="guests" value={formData.guests} onChange={handleChange} className="form-control mt-1" style={inputStyle}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
              <div className="col-12">
                <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Special Request (optional)</label>
                <textarea name="notes" rows="2" value={formData.notes} onChange={handleChange} className="form-control mt-1" style={inputStyle}></textarea>
              </div>
            </div>

            <button type="submit" className="btn w-100 mt-4" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
              Check Available Tables
            </button>
          </form>
        )}

        {step === 2 && (
          <div>
            {availableTables.length === 0 ? (
              <div className="text-center py-4">
                <p style={{ color: "#C0392B" }}>Is date aur time pe koi table available nahi hai.</p>

                {joinedWaitlist ? (
                  <p style={{ color: "#5B89B5" }}>Aap waitlist mein add ho chuke hain ✓</p>
                ) : (
                  <button className="btn mt-2 me-2" style={{ backgroundColor: "#C9A659", color: "#fff" }} onClick={handleJoinWaitlist}>
                    Join Waitlist
                  </button>
                )}

                <button className="btn mt-2" style={{ backgroundColor: "#EAF1F8", color: "#5B89B5" }} onClick={() => setStep(1)}>
                  Different Time Try Karein
                </button>
              </div>
            ) : (
              <>
                <p style={{ color: "#64748B", fontSize: "0.9rem" }} className="mb-3">
                  Table pe click karke select karo:
                </p>

                <TableMap
                  tables={tables}
                  availableTableIds={availableTables.map((t) => t.id)}
                  selectedTable={selectedTable}
                  onSelect={setSelectedTable}
                />

                <div className="d-flex gap-2 mt-4">
                  <button className="btn flex-fill" style={{ backgroundColor: "#EAF1F8", color: "#5B89B5" }} onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button
                    className="btn flex-fill"
                    disabled={!selectedTable}
                    style={{ backgroundColor: selectedTable ? "#5B89B5" : "#CBD5E1", color: "#fff", fontWeight: 600 }}
                    onClick={handleConfirmBooking}
                  >
                    Confirm Table {selectedTable ? selectedTable.number : ""}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = { backgroundColor: "#F7FAFD", color: "#2D3B4E", border: "1px solid rgba(91,137,181,0.2)" };

export default ReservationForm;