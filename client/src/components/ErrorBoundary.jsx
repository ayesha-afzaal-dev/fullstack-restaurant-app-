import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App crashed:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="d-flex flex-column align-items-center justify-content-center text-center"
          style={{ minHeight: "100vh", backgroundColor: "#F7FAFD", color: "#2D3B4E", padding: "20px" }}
        >
          <div style={{ fontSize: "3.5rem", marginBottom: "10px" }}>☁️</div>
          <h2 style={{ fontFamily: "Playfair Display, serif" }}>Something Went Wrong</h2>
          <p style={{ color: "#64748B", maxWidth: "400px" }} className="mb-4">
            An unexpected error occurred. Let's get you back to a safe place.
          </p>
          <button
            onClick={this.handleReset}
            className="btn btn-lg rounded-3 px-5"
            style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;