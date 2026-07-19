import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { TableProvider } from "./context/TableContext";
import { ReviewProvider } from "./context/ReviewContext";
import { ToastProvider } from "./context/ToastContext";
import { WaitlistProvider } from "./context/WaitlistContext";
import { LoyaltyProvider } from "./context/LoyaltyContext";

import './index.css';
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import About from "./pages/About";
import Menu from "./pages/Menu";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Reservation from "./pages/Reservation";
import Login from "./pages/login";
import Signup from "./pages/signup";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  return (
    <ErrorBoundary>
    <AuthProvider>
      <TableProvider>
        <ReviewProvider>
          <WaitlistProvider>
            <LoyaltyProvider>
              <ToastProvider>
                <BrowserRouter>
                  <ScrollToTopOnNavigate />
                  <Navbar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/reservation" element={<Reservation />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                  <ScrollToTop />
                </BrowserRouter>
              </ToastProvider>
            </LoyaltyProvider>
          </WaitlistProvider>
        </ReviewProvider>
      </TableProvider>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
