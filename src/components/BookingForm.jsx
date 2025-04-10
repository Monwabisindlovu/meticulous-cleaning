import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';

const BookingForm = () => {
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [serviceType, setServiceType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);

  useEffect(() => {
    const savedSlots = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookedSlots(savedSlots);
  }, []);

  // Check if any selected date is booked
  const isAnyDateBooked = () => {
    return selectedDates.some((date) => {
      if (!date) return false;
      const dateStr = date.toISOString().split("T")[0];
      return bookedSlots.some((slot) => slot.date === dateStr);
    });
  };

  // Function to send WhatsApp message
  const sendWhatsAppMessage = () => {
    // Prepare the booking details
    const message = `Booking Details:\n
    Name: ${fullName}\n
    Service: ${serviceType}\n
    Dates: ${selectedDates.map((date) => formatDate(date)).join(", ")}\n
    Phone: ${phone}\n
    Email: ${email}\n
    Address: ${address}\n
    Street Name: ${streetName}`;

    // URL encode the message
    const encodedMessage = encodeURIComponent(message);

    // WhatsApp phone number in international format without the plus sign
    const phoneNumber = '27849621939';

    // Create the WhatsApp URL
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open the WhatsApp link in a new tab
    window.open(url, "_blank");
  };

  // Handle booking submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if at least one date is selected
    if (!selectedDates[0]) {
      alert("Please select at least one date.");
      return;
    }

    // Check if any selected date is already booked
    const bookedDates = bookedSlots.map((slot) => slot.date);
    const conflictingDates = selectedDates.filter((date) => {
      if (!date) return false;
      const dateStr = date.toISOString().split("T")[0]; // Convert to string format (YYYY-MM-DD)
      return bookedDates.includes(dateStr);
    });

    if (conflictingDates.length > 0) {
      alert(`⚠️ The following date(s) are already booked: ${conflictingDates.map(date => formatDate(date)).join(", ")}`);
      // Clear date input on failure
      setSelectedDates([null, null]);
      return;
    }

    // Create new bookings for the selected dates
    const newBookings = selectedDates.map((date) => {
      if (!date) return null; // Ignore null dates
      return {
        date: date.toISOString().split("T")[0],
        service: serviceType,
        name: fullName,
        phone,
        email,
        address,
        streetName,
      };
    }).filter(Boolean); // Remove null entries

    const updatedBookings = [...bookedSlots, ...newBookings];
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookedSlots(updatedBookings);

    alert("✅ Booking submitted successfully!");

    // Send WhatsApp message
    sendWhatsAppMessage();

    // Clear input fields on successful submission
    setSelectedDates([null, null]);
    setServiceType("");
    setFullName("");
    setPhone("");
    setEmail("");
    setAddress("");
    setStreetName("");
  };

  // Exclude Saturdays
  const excludeSaturdays = (date) => {
    return date.getDay() !== 6;
  };

  // Format date to dd/mm/yyyy
  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB"); // Format to dd/mm/yyyy
  };

  return (
    <div className="booking-page">
      <h1>Book Our Service</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        {/* Dates */}
        <div className="inline-row">
          <div>
            <label>Select Dates:</label>
            <DatePicker
              selected={selectedDates[0]}
              onChange={(dates) => setSelectedDates(dates)}
              dateFormat="dd/MM/yyyy"  // Ensure this format for DatePicker
              minDate={new Date()}
              placeholderText="Select one or more dates"
              selectsRange
              startDate={selectedDates[0]}
              endDate={selectedDates[1]}
              filterDate={excludeSaturdays}
            />
            {isAnyDateBooked() && (
              <div className="slot-booked">⚠️ One or more selected dates are already booked!</div>
            )}
          </div>
        </div>

        {/* Service Type */}
        <div>
          <label>Service Type:</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            <option value="window">Window Cleaning</option>
            <option value="floor">Floor Cleaning</option>
            <option value="carpet">Carpet Cleaning</option>
            <option value="move">Moving Services</option>
          </select>
        </div>

        {/* Full Name */}
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Address */}
        <div>
          <label>Physical Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        {/* Street Name */}
        <div>
          <label>Street Name:</label>
          <input
            type="text"
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            required
          />
          {streetName && (
            <p>
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(streetName)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </p>
          )}
        </div>

        {/* Submit */}
        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
