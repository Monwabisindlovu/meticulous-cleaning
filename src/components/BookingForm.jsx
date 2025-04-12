import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
// import emailjs from 'emailjs-com'; // Uncomment if using EmailJS

const BookingForm = () => {
  const [selectedDates, setSelectedDates] = useState([null, null]);
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

  const formatDate = (date) => date.toLocaleDateString("en-GB");

  const isAnyDateBooked = () => {
    const bookedDateSet = new Set(bookedSlots.map((slot) => slot.date));
    return selectedDates.some((date) => {
      if (!date) return false;
      const dateStr = date.toISOString().split("T")[0];
      return bookedDateSet.has(dateStr);
    });
  };

  const sendWhatsAppMessage = () => {
    const message = `📋 *Booking Details - Meticulous Cleaning Services*
👤 Name: ${fullName}
📞 Phone: ${phone}
🏠 Address: ${address}, ${streetName}
🧼 Service: ${serviceType}
🛏️ Bedrooms: ${quoteDetails?.bedrooms}
✨ Type: ${quoteDetails?.cleaningType}
🔁 Frequency: ${quoteDetails?.frequency}
💵 Total: R${quoteDetails?.total}
📅 Dates: ${selectedDates.map((d) => formatDate(d)).join(", ")}

📍 View Location: https://www.google.com/maps?q=${encodeURIComponent(address + " " + streetName)}

Want your own quote? 👉 https://your-website.com/services
`;

    const encoded = encodeURIComponent(message);
    const phoneNumber = '27849621939';
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDates[0]) {
      alert("Please select at least one date.");
      return;
    }

    const bookedDateSet = new Set(bookedSlots.map((slot) => slot.date));
    const conflictingDates = selectedDates.filter((date) => {
      if (!date) return false;
      const dateStr = date.toISOString().split("T")[0];
      return bookedDateSet.has(dateStr);
    });

    if (conflictingDates.length > 0) {
      alert(`❌ The date(s) ${conflictingDates.map(d => formatDate(d)).join(", ")} are already booked. Please choose another.`);
      setSelectedDates([null, null]);
      return;
    }

    const newBookings = selectedDates.map((date) => {
      if (!date) return null;
      return {
        date: date.toISOString().split("T")[0],
        service: serviceType,
        name: fullName,
        phone,
        address,
        streetName,
        ...quoteDetails,
      };
    }).filter(Boolean);

    for (const booking of newBookings) {
      await addDoc(collection(db, "bookings"), booking);
    }

    alert("✅ Booking submitted successfully!");
    sendWhatsAppMessage();

    setSelectedDates([null, null]);
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
          <button className="clear-quote-btn" onClick={() => {
            localStorage.removeItem("quoteInfo");
            window.location.reload();
          }}>
            🧮 Change Quote Details
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Dates */}
        <div className="inline-row">
          <div>
            <label>Select Dates:</label>
            <DatePicker
              selected={selectedDates[0]}
              onChange={(dates) => setSelectedDates(dates)}
              selectsRange
              startDate={selectedDates[0]}
              endDate={selectedDates[1]}
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              placeholderText="Select one or more dates"
              filterDate={excludeSaturdays}
            />
            {isAnyDateBooked() && (
              <div className="slot-booked">⚠️ One or more selected dates are already booked!</div>
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

