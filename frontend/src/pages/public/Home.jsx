import React from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./home.css";

const Home = () => {
  const [cookies] = useCookies(["username"]);
  const isLoggedIn = Boolean(cookies.username);
  const route = isLoggedIn ? "/dashboard" : "/signup";
  const text = isLoggedIn ? "Go to Dashboard" : "Start For Free";
  
const services = [
  {
    emoji: "🎯",
    title: "AI ATS Analyzer",
    desc: "Get instant ATS compatibility scores and AI-powered suggestions to beat applicant tracking systems.",
    tag: "Most Used",
    path: "/uploadresume" // Add this
  },
  {
    emoji: "📄",
    title: "Resume Builder",
    desc: "Craft professional resumes with beautiful templates and AI-assisted content writing.",
    tag: "Fan Favorite",
    path: "/Resumetemplates"
  },
  {
    emoji: "🌐",
    title: "Portfolio Builder",
    desc: "Create stunning portfolio websites to showcase your work — publish with one click.",
    tag: "Stand Out",
    path: "/userportfolios"
  },
];

 const steps = [
  { 
    bgNum: "01", 
    num: "1", 
    title: "Upload or Create", 
    desc: "Upload your existing resume or start fresh with our builder." 
  },
  { 
    bgNum: "02", 
    num: "2", 
    title: "AI Analysis", 
    desc: "Our AI scans for ATS issues, missing keywords, and formatting problems." 
  },
  { 
    bgNum: "03", 
    num: "3", 
    title: "Optimize & Build", 
    desc: "Apply suggestions, build your resume and portfolio with ease." 
  },
  { 
    bgNum: "04", 
    num: "4", 
    title: "Land Interviews", 
    desc: "Export, share your portfolio, and start getting callbacks." 
  },
];

  const testimonials = [
    { name: "Sarah Chen", role: "Software Intern", text: "I went from zero callbacks to three interviews in a week. The ATS scanner is a cheat code.", initial: "SC" },
    { name: "Marcus Webb", role: "Marketing Grad", text: "The portfolio builder helped me stand out. Managers mentioned my site in the interview!", initial: "MW" },
    { name: "Priya Rao", role: "UI Designer", text: "Cleanest builder I've used. No fuss, just high-quality professional results.", initial: "PR" },
  ];
  


  

  return (
    <div className="home-container">
      {/* HERO SECTION */}
      {/* <section className="hero-wrapper">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1>
                Land the Job <br />
                <span className="highlight">With AI Precision.</span>
              </h1>
              <p>
                The smartest way for students to build resumes, track applications, 
                and showcase work. No design skills required.
              </p>
              <div className="btn-group">
                <Link to="/signup" className="btn-main">Get Started Free</Link>
                <Link to="/about" className="btn-secondary">Learn More</Link>
              </div>
            </div>

            <div className="hero-visual">
              <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                <div style={{ width: "12px", height: "12px", background: "#ff5f56", borderRadius: "50%" }}></div>
                <div style={{ width: "12px", height: "12px", background: "#ffbd2e", borderRadius: "50%" }}></div>
                <div style={{ width: "12px", height: "12px", background: "#27c93f", borderRadius: "50%" }}></div>
              </div>
              <div className="skeleton-rect"></div>
              <div className="skeleton-line" style={{ width: "80%" }}></div>
              <div className="skeleton-line" style={{ width: "60%" }}></div>
              <div className="skeleton-line" style={{ width: "90%" }}></div>
              <div style={{ marginTop: "auto", padding: "15px", borderTop: "1px solid var(--border)", textAlign: "center", color: "var(--primary)", fontWeight: "bold" }}>
                AI Analysis Complete: 98% Match
              </div>
            </div>
          </div>
        </div>
      </section> */}

    <section className="hero-section">
      <div className="hero-inner">
        {/* Top Badge & Social Proof */}
        <header className="hero-header">
          <div className="ai-badge">
            <span className="emoji">✨</span> AI-POWERED CAREER TOOLS FOR STUDENTS
          </div>
          
        </header>

        {/* Hero Text content */}
        <h1 className="hero-title">
          Beat the Bots. 
          Land <br/>the Job.
        </h1>
        
        <p className="hero-description">
          Analyze, optimize, and build ATS-crushing resumes. Create stunning 
          portfolios. Get hired faster — even as a student with no experience.
        </p>

        {/* CTA Actions */}
        <div className="hero-actions">
          <Link className="btn-primary" to={route}>
            {text} <span className="arrow">→</span>
          </Link>
          {/* <button className="btn-secondary">See Examples</button> */}
        </div>

        {/* Trust Markers */}
        <footer className="hero-trust-markers">
          <span>✓ Free forever plan</span>
          <span>✓ No credit card</span>
          <span>✓ Instant results</span>
        </footer>
      </div>
    </section>



      {/* SERVICES SECTION */}
      {/* <section className="original-services-section">
  <div className="container">
    <div className="original-tag-chip">🚀 WHAT WE OFFER</div>
    <h2 className="original-h2">
      Everything You Need to <span className="highlight">Get Hired</span>
    </h2>
    <p className="original-subtitle">
      Three powerful AI tools in one place. Built specifically for students, fresh grads, and career switchers.
    </p>

    <div className="original-services-grid">
      {services.map((s, i) => (
        <div key={i} className="original-card">
          <span className="original-card-tag">{s.tag}</span>
          <span className="original-card-icon">{s.emoji}</span>
          <h3>{s.title}</h3>
          <p>{s.desc}</p>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to={s.path} className="btn-main" style={{ textAlign: 'center', fontSize: '0.9rem', padding: '12px' }}>
              Use {s.title.split(' ')[1]} 
            </Link>
            
            <Link to="/features" className="original-learn-more" style={{ justifyContent: 'center' }}>
              Learn more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section> */}

<section className="services-section">
      <div className="services-inner">
        {/* Top Chip */}
        <div className="offer-badge">🚀 WHAT WE OFFER</div>
        
        <h2 className="services-title">
          Everything You Need to <span className="text-highlight">Get Hired</span>
        </h2>
        
        <p className="services-subtitle">
          Three powerful AI tools in one place. Built specifically for students, fresh grads, and career switchers.
        </p>

        <div className="services-grid">
          {services.map((s, i) => (
            <div key={i} className={`service-card ${i === 1 ? 'card-featured' : ''}`}>
              <span className="card-tag">{s.tag}</span>
              <div className="card-icon">{s.emoji}</div>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-desc">{s.desc}</p>
              
              <div className="card-actions">
                {/* <Link to={s.path} className="btn-card-action">
                  Use {s.title.split(' ')[1]}
                </Link> */}
                <Link to="/features" className="link-learn-more">
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>



      {/* PROCESS SECTION */}
      {/* <section className="process-section">
        <div className="container">
          <div className="section-title">
            <div className="original-tag-chip">⚡ SIMPLE PROCESS</div>
            <h2>
              From Upload to <span className="highlight">Interview Call</span>
            </h2>
          </div>
          
          <div className="process-grid">
            {steps.map((step, i) => (
              <div key={i} className="process-step">
                <div className="bg-number">0{step.num}</div>
                
                <div className="step-badge">{step.num}</div>
                
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                
                {i < steps.length - 1 && (
                  <div className="step-connector">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section> */}


    <section className="process-section">
  <div className="process-inner">
    {/* Centered Header */}
    <div className="process-header">
      <div className="process-badge">⚡ SIMPLE PROCESS</div>
      <h2 className="process-title">
        From Upload to <span className="text-highlight">Interview Call</span>
      </h2>
      <p className="process-subtitle">
        Our streamlined workflow ensures your profile is optimized for the modern job market in minutes.
      </p>
    </div>

    {/* Centered Grid */}
    <div className="process-grid-centered">
      {steps.map((step, i) => (
        <div key={i} className="process-card">
          {/* Big Faded Number */}
          <div className="process-bg-number">0{step.num}</div>
          
          <div className="process-card-content">
            <div className="process-step-indicator">{step.num}</div>
            <h3>{step.title}</h3>
            <p className="process-card-desc">{step.desc}</p>
          </div>

          {/* Arrow Connector (Desktop only) */}
          {i < steps.length - 1 && (
            <div className="process-arrow-connector">→</div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* TESTIMONIALS SECTION */}
      {/* TESTIMONIALS SECTION */}
    <section className="testimonials-section">
  <div className="testimonials-inner">
    {/* Centered Header */}
    <div className="testimonials-header">
      <div className="offer-badge">💬 REAL STORIES</div>
      <h2 className="services-title">
        Students Love <span className="text-highlight">ResumeAI</span>
      </h2>
      <p className="services-subtitle">
        Join thousands of successful students who landed interviews at top companies like Google, Meta, and Amazon.
      </p>
    </div>

    {/* Testimonial Grid */}
    <div className="testimonial-grid">
      {testimonials.map((t, i) => (
        <div key={i} className="testimonial-card">
          <div className="testimonial-stars">
            {[...Array(5)].map((_, index) => (
              <span key={index} className="star">★</span>
            ))}
          </div>
          
          <p className="testimonial-text">"{t.text}"</p>
          
          <div className="testimonial-user">
            <div className="user-avatar-circle">
              {t.initial}
            </div>
            <div className="user-info-text">
              <h4>{t.name}</h4>
              <p>{t.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>





     {/* CTA SECTION */}
      <section className="cta-section">
  <div className="cta-container">
    <div className="cta-card-main">
      {/* Visual background glow */}
      <div className="cta-glow"></div>
      
      <div className="cta-content">
        <div className="cta-tag">🎓 FOR STUDENTS</div>
        
        <h2 className="cta-title">
          Ready to Land Your <span className="text-highlight-white">Dream Job?</span>
        </h2>
        
        <p className="cta-description">
          Join 50,000+ students and graduates who've boosted their careers with 
          ResumeAI. It's free to start.
        </p>
        
        <Link to={route} className="btn-cta-main">
          {text} <span className="arrow">→</span>
        </Link>
        
        <p className="cta-footer-note">No credit card required • Instant access</p>
      </div>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer>
        <div className="container">
          <p>© 2026 ResumeAI. Built for students.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
