import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import emailjs from 'emailjs-com';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState(null);

  useEffect(() => {
    const quote = JSON.parse(localStorage.getItem("quoteInfo"));
    if (!quote) {
      alert("Please get a quote first.");
      window.location.href = "/services";
    } else {
      setServiceType(quote.service || "");
      setQuoteDetails(quote);
    }
  }, []);

  useEffect(() => {
    const fetchRemoteBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const remoteBookings = snapshot.docs.map(doc => doc.data());
      setBookedSlots(remoteBookings);
    };
    fetchRemoteBookings();
  }, []);

  const formatDate = (date) => date ? date.toLocaleDateString("en-GB") : "N/A";

  const isDateBooked = () => {
    if (!selectedDate) return false;
    const dateStr = selectedDate.toISOString().split("T")[0];
    return bookedSlots.some((slot) => slot.date === dateStr);
  };

  const sendWhatsAppMessage = () => {
    console.log("Preparing WhatsApp message...");

    const message = `
📋 *Booking Details - Meticulous Cleaning Services*
👤 Name: ${fullName}
📞 Phone: ${phone}
🏠 Address: ${address}, ${streetName}
🧼 Service: ${serviceType}
🛏️ Bedrooms: ${quoteDetails?.bedrooms || "N/A"}
✨ Type: ${quoteDetails?.cleaningType || "N/A"}
🔁 Frequency: ${quoteDetails?.frequency || "N/A"}
💵 Total: R${quoteDetails?.total || "N/A"}
📅 Date: ${formatDate(selectedDate)}

Want your own quote? 👉 https://your-website.com/services
    `;

    const phoneNumber = process.env.REACT_APP_WHATSAPP_NUMBER?.replace(/\s+/g, "");
    if (!phoneNumber) {
      console.error("WhatsApp number is not defined in environment variables.");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const dateStr = selectedDate.toISOString().split("T")[0];
    const isBooked = bookedSlots.some((slot) => slot.date === dateStr);

    if (isBooked) {
      alert(`❌ The selected date (${formatDate(selectedDate)}) is already booked. Please choose another.`);
      setSelectedDate(null);
      return;
    }

    const bookingData = {
      date: dateStr,
      service: serviceType,
      name: fullName,
      phone,
      address,
      streetName,
      ...quoteDetails,
    };

    await addDoc(collection(db, "bookings"), bookingData);

    alert("✅ Booking submitted successfully!");
    sendWhatsAppMessage();

    // Send confirmation email
    const templateParams = {
      name: fullName,
      phone,
      address,
      streetName,
      service: serviceType,
      bedrooms: quoteDetails?.bedrooms,
      cleaningType: quoteDetails?.cleaningType,
      frequency: quoteDetails?.frequency,
      total: quoteDetails?.total,
      dates: formatDate(selectedDate),
    };

    emailjs
      .send('service_9bs0gqm', 'template_uqgy8xb', templateParams, 'RKHNC_ItJf0swYQt')
      .then((result) => console.log('Email sent successfully:', result.text))
      .catch((error) => console.error('Email send error:', error.text));

    // Clear form
    setSelectedDate(null);
    setFullName("");
    setPhone("");
    setAddress("");
    setStreetName("");
    localStorage.removeItem("quoteInfo");
  };

  const excludeSaturdays = (date) => date.getDay() !== 6;

  return (
    <div className="booking-page">
      <h1>Book Our Service</h1>

      {quoteDetails && (
        <div className="quote-summary">
          <p><strong>Service:</strong> {quoteDetails.service}</p>
          <p><strong>Bedrooms:</strong> {quoteDetails.bedrooms}</p>
          <p><strong>Frequency:</strong> {quoteDetails.frequency}</p>
          <p><strong>Type:</strong> {quoteDetails.cleaningType}</p>
          <p><strong>Total:</strong> R{quoteDetails.total}</p>
          <button
            className="clear-quote-btn"
            onClick={() => {
              localStorage.removeItem("quoteInfo");
              window.location.reload();
            }}
          >
            🧮 Change Quote Details
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Date */}
        <div className="inline-row">
          <div>
            <label>Select Date:</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              filterDate={excludeSaturdays}
              dateFormat="dd/MM/yyyy"
              placeholderText="Choose a date"
            />
            {isDateBooked() && (
              <div className="slot-booked">⚠️ This date is already booked!</div>
            )}
          </div>
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
        </div>

        {/* Google Maps Link */}
        {address && streetName && (
          <p>
            <a
              href={`https://www.google.com/maps?q=${encodeURIComponent(address + " " + streetName)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              📍 View on Google Maps
            </a>
          </p>
        )}

        <button type="submit">Submit Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
