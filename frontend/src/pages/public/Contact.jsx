import React from 'react';
import { Link } from 'react-router-dom';
import "./contact.css";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Message sent! Our team will get back to you soon.");
  };

  return (
    <div className="contact-page">
      {/* 1. HERO SECTION */}
      <section className="contact-hero">
        <div className="contact-hero-container">
          <div className="offer-badge">📩 GET IN TOUCH</div>
          <h1 className="services-title">
            We’re Here to <span className="text-highlight">Help You Grow</span>
          </h1>
          <p className="services-subtitle">
            Have a question about our Pro features or need help with your account? Drop us a message.
          </p>
        </div>
      </section>

      {/* 2. CONTACT CONTENT */}
      <section className="contact-main-section">
        <div className="contact-grid-container">
          
          {/* Left Side: Contact Info */}
          <div className="contact-info-side">
            <div className="info-card-item">
              <div className="info-icon">📍</div>
              <div className="info-text">
                <h3>Our Location</h3>
                <p>CT Group of Institutions, Jalandhar, Punjab</p>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon">📧</div>
              <div className="info-text">
                <h3>Email Us</h3>
                <p>support@resumeai.com</p>
              </div>
            </div>

            <div className="info-card-item">
              <div className="info-icon">💬</div>
              <div className="info-text">
                <h3>Live Chat</h3>
                <p>Available Mon-Fri, 9am - 6pm IST</p>
              </div>
            </div>

            {/* Visual element matching your About Page */}
            <div className="contact-visual-deco">
              <div className="cta-glow"></div>
              <p className="deco-text">Join 50,000+ students already winning.</p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form-side">
            <form className="contact-form-card" onSubmit={handleSubmit}>
              <div className="form-group-row">
                <div className="input-field">
                  <label>Full Name</label>
                  <input type="text" placeholder="Rishipal Singh" required />
                </div>
                <div className="input-field">
                  <label>Email Address</label>
                  <input type="email" placeholder="singh@example.com" required />
                </div>
              </div>

              <div className="input-field">
                <label>Subject</label>
                <select>
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Billing / Pro Plan</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div className="input-field">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="btn-contact-submit">
                Send Message <span className="arrow">→</span>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-simple">
        <p>© 2026 ResumeAI • We respond to all inquiries within 2 hours.</p>
      </footer>
    </div>
  );
}

export default Contact;