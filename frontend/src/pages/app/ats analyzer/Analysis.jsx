import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './analysis.css';

const Analysis = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const data = location.state?.data;
  const currentPath = location.pathname;

  if (!data || !data.analysis) {
    return (
      <div className="error-container">
        <h2>No Analysis Data Found</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Back to Upload</button>
      </div>
    );
  }

  const { analysis } = data;

  // Helper function to navigate while preserving state
  const handleTabClick = (path) => {
    navigate(path, { state: { data } });
  };

  return (
    <div className="analysis-container">
     
     
      {/* Navigation Tabs */}
         
      <div className="tabs-container">
        <button 
          className={`tab-btn ${currentPath === '/analysis' ? 'active' : ''}`}
          onClick={() => handleTabClick('/analysis')}
        >
          Resume Analysis
        </button>
        <button 
          className={`tab-btn ${currentPath === '/keyword' ? 'active' : ''}`}
          onClick={() => handleTabClick('/keyword')}
        >
          Keyword Optimization
        </button>
      </div>

      <div className='tabs-container1'><button className="back-btn" onClick={() => navigate("/uploadresume")}>
  Go Back
</button></div>
      

      <header className="analysis-header">
        <h1>Analysis <span className='resume-analysis'>Resume</span></h1>
        <p>Here's how your resume matches the job requirements</p>
      </header>

      {/* 1. Score Section */}
      <section className="score-section">
        <div className="score-circle">
          <div className="score-value">
            <h2>{analysis.score || 0}</h2>
            <span>ATS SCORE</span>
          </div>
          <svg className="progress-ring" width="160" height="160">
            <circle className="progress-ring__bg" stroke="#e2e8f0" strokeWidth="10" fill="transparent" r="70" cx="80" cy="80" />
            <circle
              className="progress-ring__circle"
              stroke="#10b981"
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - (analysis.score || 0) / 100)}`}
              strokeLinecap="round"
              fill="transparent"
              r="70" cx="80" cy="80"
            />
          </svg>
        </div>
      </section>

      <div className="skills-grid">
        <div className="card">
          <div className="card-header">
            <div className="icon success-bg">✔</div>
            <h3>Skills Found</h3>
            <span className="count-badge">{analysis.skillsFound?.length || 0}</span>
          </div>
          <div className="skills-list">
            {analysis.skillsFound?.map((skill, index) => (
              <span key={index} className="skill-tag found">{skill}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="icon danger-bg">✘</div>
            <h3>Missing Skills</h3>
            <span className="count-badge">{analysis.missingSkills?.length || 0}</span>
          </div>
          <div className="skills-list">
            {analysis.missingSkills?.map((skill, index) => (
              <span key={index} className="skill-tag missing">{skill}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="suggestions-section">
        <div className="section-title">
          <span className="sparkle">✦</span>
          <h3>Improvement Suggestions</h3>
        </div>
        <div className="suggestions-list">
          {analysis.suggestions?.map((item, index) => (
            <div key={index} className="suggestion-item">
              <div className="suggestion-header">
                <span className="target">◎</span>
                <h4>{item.title}</h4>
                <span className={`priority ${item.priority?.toLowerCase()}`}>{item.priority?.toUpperCase()}</span>
              </div>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Analysis;