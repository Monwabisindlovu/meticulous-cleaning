import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './Booking.css';
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import emailjs from 'emailjs-com';
import { useNavigate } from "react-router-dom"; // React Router v6+ for navigation
import { ClipLoader } from "react-spinners"; // Loading spinner component

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [serviceType, setServiceType] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [streetName, setStreetName] = useState("");
  const [bookedSlots, setBookedSlots] = useState([]);
  const [quoteDetails, setQuoteDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  const [bookingStatus, setBookingStatus] = useState(null); // For booking status message
  const navigate = useNavigate();

  useEffect(() => {
    const quote = JSON.parse(localStorage.getItem("quoteInfo"));
    if (!quote) {
      alert("Please get a quote first.");
      navigate("/services");
    } else {
      setServiceType(quote.service || "");
      setQuoteDetails(quote);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchRemoteBookings = async () => {
      const snapshot = await getDocs(collection(db, "bookings"));
      const remoteBookings = snapshot.docs.map(doc => doc.data());
      setBookedSlots(remoteBookings);
    };
    fetchRemoteBookings();
  }, []);

  const formatDate = (date) => date ? date.toLocaleDateString("en-GB") : "N/A";
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const excludeSaturdays = (date) => date.getDay() !== 6;

  const isDateBooked = () => {
    if (!selectedDate) return false;
    const dateStr = selectedDate.toISOString().split("T")[0];
    return bookedSlots.some((slot) => slot.date === dateStr);
  };

  const sendWhatsAppToProvider = (params) => {
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\s+/g, "");
    const message = `
📢 NEW BOOKING REQUEST

👤 Name: ${params.from_name}
📧 Email: ${params.client_email}
📞 Phone: ${params.phone}
📍 Address: ${params.address}, ${params.streetName}

🧹 Service: ${params.serviceType}
${params.serviceType === "Gardening" ? `
🔁 Frequency: ${params.frequency}
📝 Notes: ${params.notes}` : `
🛏️ Bedrooms: ${params.bedrooms}
🧽 Cleaning Type: ${params.cleaningType}
🔁 Frequency: ${params.frequency}
💰 Total: R${params.total}
📝 Notes: ${params.notes}`
}
📅 Preferred Date: ${params.preferredDate}

- Meticulous Booking System ✅
`;

    if (phoneNumber) {
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    } else {
      console.warn("WhatsApp number is not configured.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a booking date.");
      return;
    }

    if (!email || !isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!fullName || !phone || !address || !streetName) {
      alert("Please fill in all required fields.");
      return;
    }

    const trimmedEmail = email.trim();
    const dateStr = selectedDate.toISOString().split("T")[0];

    if (bookedSlots.some((slot) => slot.date === dateStr)) {
      alert(`❌ The selected date (${formatDate(selectedDate)}) is already booked. Please choose another.`);
      setSelectedDate(null);
      return;
    }

    const bookingData = {
      date: dateStr,
      service: serviceType,
      name: fullName,
      phone,
      email: trimmedEmail,
      address,
      streetName,
      ...quoteDetails,
    };

    try {
      setIsSubmitting(true); // Start loading

      const docRef = await addDoc(collection(db, "bookings"), bookingData);
      const docId = docRef.id;

      const providerTemplateParams = {
        to_email: import.meta.env.VITE_PROVIDER_EMAIL,
        from_name: fullName,
        phone,
        address,
        streetName,
        serviceType,
        bedrooms: quoteDetails?.bedrooms || "N/A",
        frequency: quoteDetails?.frequency || "N/A",
        cleaningType: quoteDetails?.cleaningType || "N/A",
        total: quoteDetails?.total || "N/A",
        preferredDate: formatDate(selectedDate),
        client_email: trimmedEmail,
        notes: quoteDetails?.notes || "No notes",
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        providerTemplateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      const clientTemplateParams = {
        to_email: trimmedEmail,
        from_name: fullName,
        serviceType,
        preferredDate: formatDate(selectedDate),
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CLIENT_TEMPLATE_ID,
        clientTemplateParams,
        import.meta.env.VITE_EMAILJS_USER_ID
      );

      sendWhatsAppToProvider(providerTemplateParams);
      setBookingStatus("success");

      // Show a "Thank You" message
      setIsSubmitting(false); // Stop loading

      // Set a timer to show the thank you message for 2 seconds, then redirect to homepage
      setTimeout(() => {
        navigate("/"); // Redirect to the homepage
      }, 2000);

      // Reset form
      setSelectedDate(null);
      setFullName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setStreetName("");
      localStorage.removeItem("quoteInfo");

    } catch (error) {
      setIsSubmitting(false); // Stop loading
      console.error("❌ Submission error:", error);
      alert("🚫 Error submitting booking: " + error.message);
    }
  };

  return (
    <div className="booking-page">
      {bookingStatus === "success" ? (
        <div className="thank-you-message">
          <h2>Booking Successful!</h2>
          <p>Thank you for choosing Meticulous Cleaning Services. We’ll be in touch soon to confirm your booking.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="booking-form">
          {quoteDetails && (
            <div className="quote-summary">
              <p><strong>Service:</strong> {quoteDetails.service}</p>

              {quoteDetails.service === "Gardening" ? (
                <>
                  <p><strong>Frequency:</strong> {quoteDetails.frequency}</p>
                  <p><strong>Notes:</strong> {quoteDetails.notes || "No notes provided"}</p>
                </>
              ) : (
                <>
                  <p><strong>Bedrooms:</strong> {quoteDetails.bedrooms}</p>
                  <p><strong>Frequency:</strong> {quoteDetails.frequency}</p>
                  <p><strong>Type:</strong> {quoteDetails.cleaningType}</p>
                  <p><strong>Total:</strong> R{quoteDetails.total}</p>
                </>
              )}

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

          <div>
            <label>Full Name:</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div>
            <label>Phone:</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>

          <div>
            <label>Physical Address:</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div>
            <label>Street Name:</label>
            <input type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} required />
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? <ClipLoader size={24} /> : "Submit Booking"}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
