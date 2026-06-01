import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
// import "./home.css"; 
import "./features.css"; 

const Features = () => {


    const [cookies] = useCookies(["username"]);
    const isLoggedIn = Boolean(cookies.username);
    const route = isLoggedIn ? "/dashboard" : "/signup";
    const text = isLoggedIn ? "Go to Dashboard" : "Start For Free";

  const featureDetails = [
    {
      id: "ats",
      title: "AI ATS Analyzer",
      description: "Stop wondering why you aren't getting callbacks. Our analyzer uses the same algorithms as major HR platforms to scan your resume for keywords, formatting, and impact.",
      points: ["Real-time Keyword Optimization", "Formatting Compliance Check", "Industry Benchmarking"],
      emoji: "🎯",
      link: "/uploadresume",
      btnText: "Analyze My Resume"
    },
    {
      id: "builder",
      title: "Resume Builder",
      description: "Build a resume that looks as good as it reads. Our builder handles the design so you can focus on your achievements with AI-assisted bullet points.",
      points: ["Professional Templates", "One-Click PDF Export"],
      emoji: "📄",
      link: "/Resumetemplates",
      btnText: "Start Building"
    },
    {
      id: "portfolio",
      title: "Portfolio Builder",
      description: "A static resume is just the start. Turn your experience into a live, professional website that showcases your projects and personal brand to the world.",
      points: ["Project Showcases", "Mobile-Responsive Designs"],
      emoji: "🌐",
      link: "/userportfolios",
      btnText: "Create Portfolio"
    }
  ];

  return (
    <div className="features-page">
  {/* 1. HERO SECTION */}
  <section className="features-hero">
    <div className="hero-container">
      <div className="offer-badge">🛠️ OUR TOOLKIT</div>
      <h1 className="services-title">
        Powerful Features for <span className="text-highlight">Modern Careers</span>
      </h1>
      <p className="services-subtitle">
        Every tool you need to transition from student to professional, powered by cutting-edge AI.
      </p>
    </div>
  </section>

  {/* 2. DETAILED FEATURE SECTIONS */}
  {featureDetails.map((f, i) => (
    <section key={f.id} className={`detail-section ${i % 2 === 0 ? 'row' : 'row-reverse'}`}>
      <div className="detail-container">
        {/* Text Column */}
        <div className="detail-text-box">
          <div className="feature-emoji-badge">{f.emoji}</div>
          <h2 className="feature-item-title">{f.title}</h2>
          <p className="feature-item-desc">{f.description}</p>
          
          <ul className="feature-check-list">
            {f.points.map((point, index) => (
              <li key={index}>
                <span className="check-circle">✓</span> {point}
              </li>
            ))}
          </ul>

          <Link to={f.link} className="btn-feature-action">
            {f.btnText} <span className="arrow-small">→</span>
          </Link>
        </div>
        
        {/* Visual Column (The "Glass" UI Card) */}
        <div className="detail-visual-container">
          <div className="visual-glass-card">
            <div className="mock-ui-header">
              <div className="dot"></div><div className="dot"></div><div className="dot"></div>
            </div>
            <div className="mock-ui-body">
              <div className="visual-bar-full" style={{ width: '70%' }}></div>
              <div className="visual-bar-full" style={{ width: '90%' }}></div>
              <div className="visual-bar-full orange-bar" style={{ width: '40%' }}></div>
              <div className="visual-bar-full" style={{ width: '60%' }}></div>
              <div className="visual-bar-full purple-bar" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ))}

  {/* 3. REUSED CTA (With High Contrast) */}
 <section className="feature-cta-section">
  <div className="feature-cta-container">
    <div className="feature-cta-glass-card">
      {/* Dynamic Background Glow */}
      <div className="feature-cta-glow"></div>
      
      <div className="feature-cta-content">
        <h2 className="feature-cta-title">
          Ready to <span className="highlight-text-orange">Upgrade?</span>
        </h2>
        
        <p className="feature-cta-description">
          Join 50,000+ others already using ResumeAI to land their next role. 
          Start your journey toward a better career today.
        </p>
        
        <div className="feature-cta-button-group">
          <Link to={route} className="btn-feature-cta-primary">
            {text} <span className="cta-arrow-icon">→</span>
          </Link>
        </div>
        
        <div className="feature-cta-footer">
          <span>Free forever for basic use</span>
          <span className="dot-separator">•</span>
          <span>No credit card required</span>
        </div>
      </div>
    </div>
  </div>
</section>

  {/* 4. CLEAN FOOTER */}
  <footer className="footer-simple">
    <div className="container">
      <p>© 2026 ResumeAI • Made with ❤️ for Students</p>
    </div>
  </footer>
</div>
  );
};

export default Features;