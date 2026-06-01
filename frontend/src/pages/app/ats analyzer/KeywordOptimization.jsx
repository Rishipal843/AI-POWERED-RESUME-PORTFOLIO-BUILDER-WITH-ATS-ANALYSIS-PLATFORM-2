import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './keyword.css';

const KeywordOptimization = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const data = location.state?.data;
  const currentPath = location.pathname;

  if (!data || !data.analysis) {
    return (
      <div className="error-container">
        <h2>No Data Found</h2>
        <button className="back-btn" onClick={() => navigate('/')}>Back to Upload</button>
      </div>
    );
  }

  const { analysis } = data;

  const handleTabClick = (path) => {
    navigate(path, { state: { data } });
  };



  const filteredMatched = analysis.matchedKeywords?.filter(kw => 
    kw.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredMissing = analysis.missingKeywords?.filter(kw => 
    kw.keyword.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="keyword-container">
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

      <header className="keyword-header">
        <h1>Keyword <span className='optimization'>Optimization</span></h1>
        <p>Optimize your resume with the right keywords for ATS systems</p>
      </header>

      <div className="search-section">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search keywords..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-info">
            <span className="summary-icon match">#</span>
            <p>Keyword Match</p>
          </div>
          <h2 className="match-text">{analysis.keywordMatchPercentage}%</h2>
        </div>
        <div className="summary-card">
          <div className="summary-info">
            <span className="summary-icon found">✔</span>
            <p>Keywords Found</p>
          </div>
          <h2 className="found-text">{analysis.matchedKeywords?.length || 0}</h2>
        </div>
        <div className="summary-card">
          <div className="summary-info">
            <span className="summary-icon missing">✘</span>
            <p>Missing Keywords</p>
          </div>
          <h2 className="missing-text">{analysis.missingKeywords?.length || 0}</h2>
        </div>
      </div>

      <div className="keyword-lists-grid">
        <div className="keyword-card">
          <div className="card-title">
            <span className="title-icon success">✔</span>
            <h3>Matched Keywords</h3>
          </div>
          <div className="list-content">
            {filteredMatched?.map((item, index) => (
              <div key={index} className="keyword-row">
                <span className="kw-name">{item.keyword}</span>
                <span className={`importance-tag ${item.importance?.toLowerCase()}`}>
                  {item.importance?.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="keyword-card">
          <div className="card-title">
            <span className="title-icon danger">✘</span>
            <h3>Missing Keywords</h3>
          </div>
          <div className="list-content">
            {filteredMissing?.map((item, index) => (
              <div key={index} className="keyword-row missing">
                <span className="kw-name">{item.keyword}</span>
                <span className={`importance-tag ${item.importance?.toLowerCase()}`}>
                  {item.importance?.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="tips-section">
        <div className="tips-title">
          <span className="bolt">⚡</span>
          <h3>Optimization Tips</h3>
        </div>
        <div className="tips-list">
          {analysis.keywordOptimizationTips?.map((tip, index) => (
            <div key={index} className="tip-item">
              <div className="tip-number">{index + 1}</div>
              <p>{tip}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KeywordOptimization;