import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./darktheme.css";
import user_context from "../../UseContext";

const NAV_LINKS = ["Home", "About", "Skills", "Education", "Projects", "Contact"];

export default function Darktheme({data}) {
  // Destructure portdata from context
  const { portdata } = useContext(user_context);
  
  const portfoliodata = data || portdata || {}; 
  // Provide fallbacks to prevent errors if portdata is undefined
  const {
    navbar = {},
    hero = {},
    about = {},
    stats = [],
    techStack = [],
    journey = [],
    projects = [],
    contact = []
  } = portfoliodata;

  const displayText = (value, fallback) => {
    if (typeof value !== "string") return value ?? fallback;
    const trimmed = value.trim();
    return trimmed || fallback;
  };

  const skillLevel = (level) => {
    const value = Number(level);
    if (!Number.isFinite(value)) return 0;
    return Math.min(100, Math.max(0, value));
  };

  const [senderName, setsendername] =useState('')
  const [senderEmail, setsenderemail] =useState('')
  const [Message, setmessage] =useState('')
  const {portslug} =useContext(user_context)
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const formdata ={senderEmail,senderName,Message,portslug }

const handleSubmit = async (e) => {
  // 1. ALWAYS prevent default at the very first line
  e.preventDefault();

  if (!portslug) {
    console.error("No portslug found. Message cannot be sent.");
    alert("This portfolio is not properly configured to receive messages.");
    return;
  }

  try {
    // 2. Send the data to your backend
    const response = await axios.post("https://ai-powered-resume-portfolio-builder-with.onrender.com/api/messages", formdata);
    
    // 3. Check for success status from your API
    if (response.data.statuscode === 1) {
      setSent(true); // Shows the ✅ success message in your JSX
      
      // 4. Clear the input fields
      setsendername('');
      setsenderemail('');
      setmessage('');

      // 5. Hide the success message after 4 seconds
      setTimeout(() => setSent(false), 4000);
    } else {
      alert("Failed to send message. Please try again.");
    }
  } catch (err) {
    console.error("Error sending message:", err);
    alert("Server error. Please try again later.");
  }
};

  const scrollTo = (id) => {
    const element = document.getElementById(id.toLowerCase());
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <div className="root">
      <div className={`menuOverlay ${menuOpen ? 'overlayVisible' : ''}`} onClick={() => setMenuOpen(false)} />

      {/* ── NAV ── */}
      <nav className={`nav ${scrolled ? 'navScrolled' : ''}`}>
        <span className="navLogo">{displayText(navbar.logo, "")}</span>
        <ul className={`navLinks ${menuOpen ? 'navOpen' : ''}`}>
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <button onClick={() => scrollTo(l)} className="navLink">{l}</button>
            </li>
          ))}
        </ul>
        <button className={`burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" className="hero">
        <div className="heroContent">
          <p className="heroTag">{displayText(hero.status, '')}</p>
          <h1 className="heroName">{displayText(hero.name, "")}</h1>
          <h2 className="heroRole">{displayText(hero.headline, "")}</h2>
          <p className="heroSub">{displayText(hero.subheadline, "")}</p>
          <div className="heroBtns">
            <button onClick={() => scrollTo("Projects")} className="btnPrimary">{hero.ctaText || 'Explore Work'}</button>
            <button onClick={() => scrollTo("Contact")} className="btnOutline">Get in Touch</button>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section">
        <div className="container">
          <div className="aboutGrid">
            <div className="aboutAvatar">
              <div className="avatarRing">
  <div className="avatarInner">
    {about.profilePic ? (<img src={about.profilePic} alt="Profile" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />) : ("Picture")}
  </div>
</div>
              <div className="aboutStats">
                {stats.map((s, i) => (
                  <div key={i} className="stat">
                    <span className="statNum">{displayText(s.value, "0")}</span>
                    <span className="statLabel">{displayText(s.label, "Stat")}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="aboutText">
              <h2 className="sectionTitleLeft">About <span className="accent">Me</span></h2>
              <p>{displayText(about.description, "")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" className="section sectionAlt">
        <div className="container">
          <h2 className="sectionTitle">Tech <span className="accent">Stack</span></h2>
          <div className="skillsGrid">
            {techStack.map((s, i) => (
              <div key={i} className="skillCard">
                <div className="skillHeader">
                  <span className="skillName">{displayText(s.name, "Skill")}</span>
                  <span className="skillPct">{skillLevel(s.level)}%</span>
                </div>
                <div className="skillBar"><div className="skillFill" style={{ width: `${skillLevel(s.level)}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION / JOURNEY ── */}
      <section id="education" className="section">
        <div className="container">
          <h2 className="sectionTitle">My <span className="accent">Journey</span></h2>
          <div className="timeline">
            {journey.map((e, i) => (
              <div key={i} className="timelineItem">
                <div className="timelineDot" />
                <div className="timelineCard">
                  <span className="timelineYear">{displayText(e.duration, "")}</span>
                  <h3 className="timelineDegree">{displayText(e.title, "")}</h3>
                  <p className="timelineSchool">{displayText(e.institution, "")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="section sectionAlt">
        <div className="container">
          <h2 className="sectionTitle">Selected <span className="accent">Works</span></h2>
          <div className="projectsGrid">
            {projects.map((p, i) => (
              <div key={i} className="projectCard">
                <div className="projectGlow" />
                {p.image && <img src={p.image} alt={displayText(p.title, "Project")} className="projectImg" />}
                {displayText(p.tech, "") && <span className="projectTag">{displayText(p.tech, "Tech")}</span>}
                <h3 className="projectTitle">{displayText(p.title, "Project Title")}</h3>
                <p className="projectDesc">{displayText(p.desc, "Project description goes here.")}</p>
                <div className="projectActions">
                  {p.liveLink && <a href={p.liveLink} target="_blank" rel="noreferrer" className="projectLink">Live Demo →</a>}
                  {p.sourceCode && <a href={p.sourceCode} target="_blank" rel="noreferrer" className="projectLinkSecondary">Source Code</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="section">
        <div className="container">
          <h2 className="sectionTitle">Let's <span className="accent">Connect</span></h2>
          <div className="contactGrid">
            <div className="contactInfo">
                {/* Dynamically map the new contact array */}
                {contact.map((item, i) => (
                    <div key={i} className="contactItem">
                        <span className="contactIcon">{displayText(item.icon, "")}</span>
                        <div className="contactText">
                            <span className="contactLabel">{displayText(item.platform, "Contact")}</span>
                            <span className="contactVal">{displayText(item.value, "Add contact detail")}</span>
                        </div>
                    </div>
                ))}
              </div>
            <form className="form" onSubmit={handleSubmit}>
              {sent && <div className="successMsg">✅ Message received!</div>}
              <div className="formRow">
                <input className="input" placeholder="Name" required value={senderName} onChange={(e) => setsendername(e.target.value)} />
                <input className="input" type="email" placeholder="Email" required value={senderEmail} onChange={(e) => setsenderemail(e.target.value)} />
              </div>
              <textarea className="input textarea" placeholder="Message" rows={4} required value={Message} onChange={(e) => setmessage(e.target.value)} />
              <button type="submit" className="btnPrimary">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {displayText(hero.name, "John Doe")}.</p>
      </footer>
    </div>
  );
}
