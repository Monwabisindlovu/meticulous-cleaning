import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Use this instead of useHistory
import "./QuoteModal.css";


const pricingData = {
  onceOff: {
    basic: {
      "1 Bedroom": 500,
      "2 Bedrooms": 700,
      "3 Bedrooms": 1000,
      "4 Bedrooms": 1500,
    },
    deep: {
      "1 Bedroom": 700,
      "2 Bedrooms": 1000,
      "3 Bedrooms": 1500,
      "4 Bedrooms": 2000,
    },
  },
  monthly: {
    once: {
      "1 Bedroom": 1000,
      "2 Bedrooms": 1200,
      "3 Bedrooms": 1500,
      "4 Bedrooms": 2000,
    },
    twice: {
      "1 Bedroom": 1750,
      "2 Bedrooms": 2100,
      "3 Bedrooms": 2625,
      "4 Bedrooms": 3500,
    },
    thrice: {
      "1 Bedroom": 2500,
      "2 Bedrooms": 3000,
      "3 Bedrooms": 3750,
      "4 Bedrooms": 5000,
    },
  },
};

const QuoteModal = ({ service, onClose }) => {
  const navigate = useNavigate(); // ✅ Use navigate instead of history

  const [frequency, setFrequency] = useState("onceOff");
  const [cleaningType, setCleaningType] = useState("basic");
  const [bedrooms, setBedrooms] = useState("1 Bedroom");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let price = 0;
    if (frequency === "onceOff") {
      price = pricingData.onceOff[cleaningType][bedrooms];
    } else {
      price = pricingData.monthly[frequency][bedrooms];
    }
    setTotal(price);
  }, [frequency, cleaningType, bedrooms]);

  const handleContinueToBooking = () => {
    const quoteData = { service, frequency, cleaningType, bedrooms, total, notes };
    localStorage.setItem("quoteInfo", JSON.stringify(quoteData));
    navigate("/booking"); // ✅ Navigates to Booking page
  };

  return (
    <div className="quote-modal">
      <div className="quote-content">
        <h2>{service}</h2>

        <div className="input-group">
          <label>Frequency</label>
          <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="onceOff">Once-off</option>
            <option value="once">Once a week</option>
            <option value="twice">Twice a week</option>
            <option value="thrice">Thrice a week</option>
          </select>
        </div>

        {frequency === "onceOff" && (
          <div className="input-group">
            <label>Cleaning Type</label>
            <select value={cleaningType} onChange={(e) => setCleaningType(e.target.value)}>
              <option value="basic">Basic</option>
              <option value="deep">Deep</option>
            </select>
          </div>
        )}

        <div className="input-group">
          <label>Bedrooms</label>
          <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}>
            <option value="1 Bedroom">1 Bedroom</option>
            <option value="2 Bedrooms">2 Bedrooms</option>
            <option value="3 Bedrooms">3 Bedrooms</option>
            <option value="4 Bedrooms">4 Bedrooms</option>
          </select>
        </div>

        <div className="input-group">
          <label>Your Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Custom Notes</label>
          <textarea
            placeholder="Special requests or details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <h3>Total: R{total}</h3>

        <div className="quote-buttons">
          <button onClick={handleContinueToBooking}>📋 Continue to Booking</button>
          <button onClick={onClose}>❌ Close</button>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
