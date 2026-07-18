function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#1C1B18",
        color: "#F5F1E8",
        borderTop: "1px solid rgba(244,167,0,0.2)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-lg-4 col-md-6">
            <h3
              className="fw-bold mb-3"
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#F4A700",
                textShadow: "0 0 12px rgba(244,167,0,0.4)",
              }}
            >
              I <span style={{ color: "#FF4D5A" }}>&#10084;</span> Clouds
            </h3>
            <p style={{ color: "rgba(245,241,232,0.7)", maxWidth: "300px" }}>
              A cozy corner where warm light meets green calm. Come for the food, stay for the vibe.
            </p>

            <div className="d-flex gap-3 mt-3">
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: "38px", height: "38px", backgroundColor: "#2E4E3F", color: "#F4A700", textDecoration: "none", border: "1px solid rgba(244,167,0,0.3)" }}>
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: "38px", height: "38px", backgroundColor: "#2E4E3F", color: "#F4A700", textDecoration: "none", border: "1px solid rgba(244,167,0,0.3)" }}>
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="d-flex align-items-center justify-content-center rounded-circle" style={{ width: "38px", height: "38px", backgroundColor: "#2E4E3F", color: "#F4A700", textDecoration: "none", border: "1px solid rgba(244,167,0,0.3)" }}>
                <i className="bi bi-whatsapp"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#F4A700", letterSpacing: "1px" }}>EXPLORE</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><a href="#home" style={{ color: "rgba(245,241,232,0.7)", textDecoration: "none" }}>Home</a></li>
              <li><a href="#menu" style={{ color: "rgba(245,241,232,0.7)", textDecoration: "none" }}>Menu</a></li>
              <li><a href="#about" style={{ color: "rgba(245,241,232,0.7)", textDecoration: "none" }}>About</a></li>
              <li><a href="#reservation" style={{ color: "rgba(245,241,232,0.7)", textDecoration: "none" }}>Reservation</a></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#F4A700", letterSpacing: "1px" }}>CONTACT</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ color: "rgba(245,241,232,0.7)" }}>
              <li><i className="bi bi-geo-alt-fill me-2" style={{ color: "#F4A700" }}></i>123 Cloud Street, Gujrat, Punjab</li>
              <li><i className="bi bi-telephone-fill me-2" style={{ color: "#F4A700" }}></i>+92 300 1234567</li>
              <li><i className="bi bi-envelope-fill me-2" style={{ color: "#F4A700" }}></i>hello@iloveclouds.com</li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6">
            <h6 className="fw-bold mb-3" style={{ color: "#F4A700", letterSpacing: "1px" }}>OPENING HOURS</h6>
            <ul className="list-unstyled d-flex flex-column gap-2" style={{ color: "rgba(245,241,232,0.7)" }}>
              <li className="d-flex justify-content-between" style={{ maxWidth: "220px" }}>
                <span>Mon - Fri</span><span>11:00 AM - 11:00 PM</span>
              </li>
              <li className="d-flex justify-content-between" style={{ maxWidth: "220px" }}>
                <span>Sat - Sun</span><span>10:00 AM - 12:00 AM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(245,241,232,0.1)" }}>
        <div className="container py-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <p className="mb-0" style={{ color: "rgba(245,241,232,0.5)", fontSize: "0.9rem" }}>
            &copy; {new Date().getFullYear()} I Love Clouds. All rights reserved.
          </p>
          <p className="mb-0" style={{ color: "rgba(245,241,232,0.5)", fontSize: "0.9rem" }}>
            Made with <span style={{ color: "#FF4D5A" }}>&#10084;</span> and warm lights
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;