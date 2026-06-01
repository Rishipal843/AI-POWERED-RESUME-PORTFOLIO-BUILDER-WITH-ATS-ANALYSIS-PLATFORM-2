import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import "./pricing.css";

const Pricing = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "0",
      desc: "Perfect for students just starting their job search journey.",
      features: [
        { text: "3 ATS scans/month", enabled: true },
        { text: "1 Resume ", enabled: true },
        { text: "Basic templates", enabled: true },
        { text: "PDF export", enabled: true },
        { text: "Portfolio preview", enabled: true },
      ],
      btnText: "Get Started",
      link: "/signup",
      isPro: false,
    },
    {
      name: "Pro Plan",
      price: "199",
      desc: "Designed for graduates and professionals who want a competitive edge.",
      features: [
        { text: "Unlimited ATS scans", enabled: true },
        { text: "Unlimited resumes", enabled: true },
        { text: "All Premium Templates", enabled: true },
        { text: "Portfolio Builder", enabled: true },
        { text: "Priority AI Suggestions", enabled: true },
        { text: "Unlimited PDF Exports", enabled: true },
      ],
      btnText: "Upgrade to Pro",
      link: "/signup",
      isPro: true,
    },
  ];

  return (
    <div className="pricing-page">
  {/* 1. HERO SECTION */}
  <section className="pricing-hero">
    <div className="pricing-inner">
      <div className="offer-badge">💎 PRICING</div>
      <h1 className="services-title">
        Simple Plans for <span className="text-highlight">Every Career</span>
      </h1>
      <p className="services-subtitle">
        Choose the plan that fits your current goals. No hidden fees, cancel anytime.
      </p>
    </div>
  </section>

  {/* 2. PRICING GRID */}
  <div className="pricing-grid-container">
    <div className="pricing-flex-row">
      {plans.map((plan, i) => (
        <div key={i} className={`pricing-card-v2 ${plan.isPro ? "pro-card" : "free-card"}`}>
          {plan.isPro && <div className="card-popular-tag">RECOMMENDED</div>}
          
          <div className="plan-header">
            <span className="plan-name-badge">{plan.name}</span>
            <div className="plan-price-main">
              ₹{plan.price}<span className="price-suffix">/month</span>
            </div>
            <p className="plan-description-text">{plan.desc}</p>
          </div>
          
          <ul className="plan-features-list">
            {plan.features.map((feat, idx) => (
              <li key={idx} className={feat.enabled ? "feat-enabled" : "feat-disabled"}>
                <span className={`feat-icon ${feat.enabled ? "check" : "cross"}`}>
                  {feat.enabled ? "✓" : "✕"}
                </span>
                {feat.text}
              </li>
            ))}
          </ul>

          <Link to={plan.link} className={`btn-pricing-action ${plan.isPro ? "btn-orange" : "btn-outline"}`}>
            {plan.btnText} <span className="arrow">→</span>
          </Link>
        </div>
      ))}
    </div>
  </div>

  {/* 3. FINAL CTA */}
 <section className="pricing-cta-section">
  <div className="pricing-cta-container">
    <div className="pricing-cta-glass-card">
      {/* Dynamic Background Glow */}
      <div className="pricing-cta-glow"></div>
      
      <div className="pricing-cta-content">
        <div className="pricing-cta-badge">HELP CENTER</div>
        
        <h2 className="pricing-cta-title">
          Still Have <span className="text-orange-glow">Questions?</span>
        </h2>
        
        <p className="pricing-cta-subtitle">
          Not sure which plan is right for you? Our career experts are 
          available 24/7 to help you make the best choice.
        </p>
        
        <div className="pricing-cta-actions">
          <Link to="/contact" className="btn-pricing-cta">
            Contact Support <span className="cta-arrow">→</span>
          </Link>
        </div>
        
        <div className="pricing-cta-stats">
          <span>Avg. response time: <strong>&lt; 2 hours</strong></span>
        </div>
      </div>
    </div>
  </div>
</section>

  <footer className="footer-simple">
    <p>© 2026 ResumeAI • Honest pricing for students.</p>
  </footer>
</div>
  );
};

export default Pricing;