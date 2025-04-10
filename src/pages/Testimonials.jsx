import React, { useState, useEffect } from "react";
import EmojiPicker from "emoji-picker-react";  // Corrected import statement
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newName, setNewName] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Load testimonials from localStorage when the component mounts
  useEffect(() => {
    const savedTestimonials = JSON.parse(localStorage.getItem("testimonials"));
    if (savedTestimonials) {
      setTestimonials(savedTestimonials);
    }
  }, []);

  // Save testimonials to localStorage whenever they change
  useEffect(() => {
    if (testimonials.length > 0) {
      localStorage.setItem("testimonials", JSON.stringify(testimonials));
    }
  }, [testimonials]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName && newComment && newRating) {
      const newTestimonial = {
        name: newName,
        comment: newComment + " " + selectedEmoji,
        rating: parseInt(newRating),
      };
      const updatedTestimonials = [...testimonials, newTestimonial];
      setTestimonials(updatedTestimonials);
      setNewName("");
      setNewComment("");
      setNewRating(5);
      setSelectedEmoji("");
      setShowEmojiPicker(false);
    }
  };

  // Handle emoji selection
  const handleEmojiClick = (emoji) => {
    setNewComment((prevComment) => prevComment + emoji.emoji);
    setSelectedEmoji(emoji.emoji);
  };

  return (
    <div className="testimonials-page">
      <h1>Customer Testimonials</h1>

      <div className="testimonial-list">
        {testimonials.map((t, index) => (
          <div key={index} className="testimonial-card">
            <h3>{t.name}</h3>
            <p>{t.comment}</p>
            <div className="stars">
              {"★".repeat(t.rating)}
              {"☆".repeat(5 - t.rating)}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="testimonial-form">
        <h2>Leave a Review</h2>
        <input
          type="text"
          placeholder="Your Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />

        <div className="comment-container">
          <span
            className="emoji-link"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            😀 Add Emoji
          </span>

          {/* Comment Textarea */}
          <textarea
            placeholder="Your Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          ></textarea>

          {/* Emoji Picker Dropdown */}
          {showEmojiPicker && (
            <div className="emoji-picker">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <label>Rating:</label>
        <select
          value={newRating}
          onChange={(e) => setNewRating(e.target.value)}
        >
          <option value={5}>★★★★★ (5)</option>
          <option value={4}>★★★★☆ (4)</option>
          <option value={3}>★★★☆☆ (3)</option>
          <option value={2}>★★☆☆☆ (2)</option>
          <option value={1}>★☆☆☆☆ (1)</option>
        </select>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default Testimonials;
