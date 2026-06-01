import React from 'react';
import { Link } from 'react-router-dom'; // This was likely missing
import "./about.css";

const About = () => {
  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-container">
          <div className="offer-badge">🚀 OUR MISSION</div>
          <h1 className="services-title">
            Bridging the Gap Between <span className="text-highlight">Education & Careers</span>
          </h1>
          <p className="services-subtitle">
            We started ResumeAI with a simple goal: to give every student the same competitive edge as a professional with 10 years of experience.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY (Split Layout) */}
      <section className="about-split-section">
        <div className="about-container">
          <div className="about-text-content">
            <h2 className="about-h2">Why We Built This</h2>
            <p className="about-p">
              As former students ourselves, we noticed a massive problem: talented graduates were being rejected not because of their skills, but because of <strong>outdated resume formats</strong> and <strong>unoptimized keywords</strong>.
            </p>
            <p className="about-p">
              We built ResumeAI to level the playing field. Our platform uses advanced AI to ensure your hard work actually gets seen by human recruiters.
            </p>
            <div className="about-stats-row">
              <div className="stat-item">
                <h3>50K+</h3>
                <p>Users Joined</p>
              </div>
              <div className="stat-item">
                <h3>85%</h3>
                <p>Interview Rate</p>
              </div>
            </div>
          </div>
          
          <div className="about-visual-box">
            <div className="about-glass-card">
              <div className="cta-glow"></div>
              <div className="mock-ui-elements">
                <div className="mock-line orange"></div>
                <div className="mock-line wide"></div>
                <div className="mock-line medium"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES (Grid Layout) */}
      <section className="values-section">
        <div className="about-container">
          <h2 className="about-h2-centered">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Accuracy First</h3>
              <p>We prioritize ATS compatibility and factual integrity in every resume we build.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⚡</div>
              <h3>Student-Led</h3>
              <p>Every feature is designed based on the real-world struggles of modern graduates.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Privacy Minded</h3>
              <p>Your data belongs to you. We never sell your personal information to third parties.</p>
            </div>
          </div>
        </div>
      </section>

   

      <footer className="footer-simple">
        <p>© 2026 ResumeAI • Empowering the next generation.</p>
      </footer>
    </div>
  );
}

export default About;