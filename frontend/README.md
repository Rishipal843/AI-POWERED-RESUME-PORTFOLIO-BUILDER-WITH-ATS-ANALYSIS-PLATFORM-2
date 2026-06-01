import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { Portfolioregistry } from './Portfolioregistry';
import "./userportfolio.css";

const Userportfolios = () => {
  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPortfolios = async () => {
      try {
        const email = Cookies.get("username");
        const res = await axios.get(
          `http://localhost:8000/api/user-portfolios/${email}`
        );
        
        const sortedData = res.data.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setSavedPortfolios(sortedData);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      }
      setLoading(false);
    };
    fetchUserPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="pb-loader-container">
        <div className="pb-spinner"></div>
        <p>Loading your showcases...</p>
      </div>
    );
  }

  return (
    <div className="pb-gallery-wrapper">
      {/* 1. HEADER SECTION */}
      <header className="pb-gallery-header">
        <div className="resume-offer-badge">🚀 PORTFOLIO HUB</div>
        <h1 className="pb-main-title">
          My Built <span className="text-highlight">Portfolios</span>
        </h1>
        <p className="pb-sub-title">
          Manage and edit your existing professional showcases with ease.
        </p>
      </header>

      {/* 2. DYNAMIC GRID */}
      <div className="pb-cards-grid">
        {/* ACTION CARD: CREATE NEW */}
        <div className="template-card-wrapper">
          <Link to="/portfoliotemplate" className="pb-card pb-add-new-card">
            <div className="pb-preview-box pb-flex-center">
              <span className="pb-plus-icon">+</span>
            </div>
            <div className="pb-card-info">
              <h3 className="pb-item-title">Create New</h3>
              <p className="template-desc">Start a fresh project from a template</p>
            </div>
          </Link>
        </div>

        {/* SAVED PORTFOLIOS */}
        {savedPortfolios.map((item) => {
          const TemplateComponent = Portfolioregistry[item.template];

          return (
            <div key={item._id} className="template-card-wrapper">
              <div className="pb-card">
                <div className="pb-preview-box">
                  {/* HOVER OVERLAY */}
                  <div className="preview-overlay">
                    <Link to={`/portfoliodetails/${item.slug}`} className="btn-use">
                      View Details
                    </Link>
                  </div>
                  
                  <div className="pb-iframe-shield"></div>
                  <div className="pb-iframe-element">
                    {TemplateComponent ? (
                      <TemplateComponent data={item} />
                    ) : (
                      <div className="pb-flex-center" style={{ height: '100%' }}>
                        <p>Template Missing</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-card-info">
                  <div className="card-top-info">
                    <h3 className="pb-item-title">{item.slug || "Untitled Project"}</h3>
                    <span className="tag-label">PORTFOLIO</span>
                  </div>
                  <div className="pb-action-links">
                    <Link to={`/portfoliodetails/${item.slug}`}>View Live</Link>
                    <span className="pb-sep">|</span>
                    <Link to={`/portfolioupdate?id=${item._id}`}>Edit Page</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Userportfolios;





































/* --- Global Layout --- */
.pb-gallery-wrapper {
  min-height: 100vh;
  background-color: #f8fafc;
  padding: 80px 5%;
  font-family: 'Inter', sans-serif;
}

/* --- Header Section --- */
.pb-gallery-header {
  text-align: center;
  margin-bottom: 60px;
}

.resume-offer-badge {
  display: inline-block;
  background: #fff;
  color: #555;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.04);
  border: 1px solid rgba(0,0,0,0.05);
}

.pb-main-title {
  font-size: 3.2rem;
  font-weight: 500;
  color: #1a1f36;
  letter-spacing: -1.5px;
  margin: 10px 0;
}

.text-highlight { color: #f15a24; }

.pb-sub-title {
  color: #64748b;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
}

/* --- The Grid --- */
.pb-cards-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

/* --- Card Wrapper & Hover State --- */
.template-card-wrapper {
  width: 380px;
  background: white;
  border-radius: 24px;
  border: 1px solid transparent;
  padding: 10px;
  transition: all 0.3s ease;
}

.template-card-wrapper:hover {
  border-color: #f15a24;
  transform: translateY(-8px);
}

.pb-card {
  text-decoration: none;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
}

/* --- Centered Preview Scaling --- */
.pb-preview-box {
  width: 100%;
  height: 440px;
  background-color: #f1f5f9;
  position: relative;
  overflow: hidden; 
  display: flex;
  justify-content: center;
  padding-top: 30px;
}

.pb-iframe-element {
  /* Scale 1400px desktop view to fit card */
  transform: scale(0.2); 
  transform-origin: top center;
  width: 1400px;
  height: 1800px;
  background: white;
  box-shadow: 0 0 20px rgba(0,0,0,0.05);
  pointer-events: none;
}

.pb-iframe-shield {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: transparent;
  cursor: pointer;
}

/* --- Hover Overlay Button --- */
.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(26, 31, 54, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.pb-card:hover .preview-overlay {
  opacity: 1;
}

.btn-use {
  background: #f15a24;
  color: white;
  padding: 12px 28px;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  box-shadow: 0 10px 20px rgba(241, 90, 36, 0.3);
}

/* --- Card Content --- */
.pb-card-info {
  padding: 25px 15px;
  text-align: left;
}

.card-top-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.pb-item-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #1a1f36;
  margin: 0;
  text-transform: capitalize;
}

.tag-label {
  font-size: 0.7rem;
  font-weight: 800;
  background: #f15a2415;
  color: #f15a24;
  padding: 4px 10px;
  border-radius: 6px;
  text-transform: uppercase;
}

.pb-action-links {
  display: flex;
  gap: 12px;
  align-items: center;
}

.pb-action-links a {
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 700;
  color: #64748b;
  transition: color 0.2s;
}

.pb-action-links a:hover { color: #f15a24; }
.pb-sep { color: #e2e8f0; }

/* --- Create New Card --- */
.pb-add-new-card {
  border: 2px dashed #cbd5e1;
  background: rgba(255, 255, 255, 0.5);
}

.pb-plus-icon {
  font-size: 80px;
  color: #cbd5e1;
  font-weight: 100;
}

.template-card-wrapper:hover .pb-add-new-card {
  border-color: #f15a24;
}

.template-card-wrapper:hover .pb-plus-icon {
  color: #f15a24;
  transform: rotate(90deg);
  transition: all 0.4s ease;
}

/* --- Loader --- */
.pb-loader-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.pb-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f1f5f9;
  border-top: 4px solid #f15a24;
  border-radius: 50%;
  animation: pb-spin 1s linear infinite;
}

@keyframes pb-spin { to { transform: rotate(360deg); } }

.pb-flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

















analyze my project in which i give three services
1.resume builder
2. ats resume score analyzer 
3. portfolio builder 

 in frontend/src/app/resumebulder folder i have resume edit file where i fill the data and that data update the resume template component and user can download it 

the problem is that when content overflow the component it hides not shift to the next page with splitter 
resume templates are present in \frontend\src\templates\resumes make the multipage template and second page show when first one is filled