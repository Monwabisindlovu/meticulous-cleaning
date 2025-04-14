// src/pages/Booking.jsx
import React from "react";
import BookingForm from "@/components/QuoteRequestModal";
import './Booking.css'; 

const Booking = () => {
  return (
    <div className="booking-page">
      <h1>Book a Cleaning Service</h1>
      <BookingForm />
    </div>
  );
};

export default Booking;
