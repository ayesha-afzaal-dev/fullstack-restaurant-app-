import React, { useState } from "react";
import usePageTitle from "../hooks/usePageTitle";

function Contact() {
  usePageTitle("Contact")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSent(true);
  };

  return (
    <div className="page-fade" style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif" }}>
      <section className="py-5 text-center" style={{ paddingTop: "100px" }}>
        <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px" }}>GET IN TOUCH</span>
        <h1 className="display-4 fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
          We'd Love to Hear From You
        </h1>
        <p style={{ color: "#64748B", maxWidth: "550px" }} className="mx-auto mt-2">
          Questions, feedback, or a private event — reach out anytime.
        </p>
      </section>

      <section className="py-5">
        <div className="container pb-5">
          <div className="row g-5">
            <div className="col-lg-5">
              <h3 className="mb-4" style={{ fontFamily: "Playfair Display, serif", color: "#5B89B5" }}>Visit Us</h3>

              <div className="mb-4">
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", letterSpacing: "1px" }}>ADDRESS</p>
                <p style={{ color: "#2D3B4E" }}>123 Garden Street, Karachi, Pakistan</p>
              </div>
              <div className="mb-4">
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", letterSpacing: "1px" }}>PHONE</p>
                <p style={{ color: "#2D3B4E" }}>+92 300 1234567</p>
              </div>
              <div className="mb-4">
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", letterSpacing: "1px" }}>EMAIL</p>
                <p style={{ color: "#2D3B4E" }}>hello@ihcloudsrestaurant.com</p>
              </div>
              <div className="mb-4">
                <p style={{ color: "#94A3B8", fontSize: "0.85rem", letterSpacing: "1px" }}>OPENING HOURS</p>
                <p style={{ color: "#2D3B4E" }}>Mon – Sun: 12:00 PM – 11:00 PM</p>
              </div>

              <div className="rounded-4 mt-4" style={{ height: "220px", backgroundColor: "#EAF1F8", border: "1px solid rgba(91,137,181,0.2)" }}></div>
            </div>

            <div className="col-lg-7">
              {sent ? (
                <div className="d-flex flex-column align-items-center justify-content-center text-center rounded-4 p-5 h-100" style={{ backgroundColor: "#EAF1F8", border: "1px solid rgba(91,137,181,0.2)" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>✉️</div>
                  <h4 style={{ fontFamily: "Playfair Display, serif" }}>Message Sent</h4>
                  <p style={{ color: "#64748B" }}>Thank you, {formData.name} — we'll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-4 p-4 p-md-5" style={{ backgroundColor: "#FFFFFF", border: "1px solid rgba(91,137,181,0.15)" }}>
                  <div className="row g-3">
                    <div className="col-12">
                      <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Full Name</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
                    </div>
                    <div className="col-12">
                      <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Email</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} className="form-control mt-1" style={inputStyle} />
                    </div>
                    <div className="col-12">
                      <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Message</label>
                      <textarea name="message" rows="5" required value={formData.message} onChange={handleChange} className="form-control mt-1" style={inputStyle} placeholder="Tell us what's on your mind..."></textarea>
                    </div>
                  </div>

                  <button type="submit" className="btn w-100 mt-4" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputStyle = { backgroundColor: "#F7FAFD", color: "#2D3B4E", border: "1px solid rgba(91,137,181,0.2)" };

export default Contact;