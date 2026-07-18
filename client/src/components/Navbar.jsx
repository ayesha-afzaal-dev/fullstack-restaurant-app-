function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg py-3"
      style={{
        backgroundColor: "#1C1B18",
        borderBottom: "1px solid rgba(245,241,232,0.2)",
      }}
    >
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left Side - Brand Name */}
        <a
          className="navbar-brand fw-bold fs-3 mb-0"
          href="/"
          style={{
            fontFamily: "Playfair Display, serif",
            color: "#F4A700",
            textShadow: "0 0 12px rgba(244,167,0,0.5)",
          }}
        >
          I <span style={{ color: "#FF4D5A" }}>&#10084;</span> Clouds
        </a>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          style={{ borderColor: "#F5F1E8" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side - Nav Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navMenu">
          <ul
            className="navbar-nav align-items-lg-center gap-lg-4 gap-2 mt-3 mt-lg-0"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <li className="nav-item">
              <a className="nav-link" href="#home" style={{ color: "#F5F1E8" }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#menu" style={{ color: "#F5F1E8" }}>
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about" style={{ color: "#F5F1E8" }}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#reservation" style={{ color: "#F5F1E8" }}>
                Reservation
              </a>
            </li>
            <li className="nav-item">
              <a
                className="btn rounded-3 px-4"
                href="#contact"
                style={{
                  backgroundColor: "#2E4E3F",
                  color: "#F4A700",
                  border: "1px solid #F4A700",
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;