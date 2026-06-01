import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Resumetemplate.css";
import Classic from '../../../templates/resumes/Classic';
import Minimal from '../../../templates/resumes/Minimal';
import Simple from '../../../templates/resumes/Simple';
import Darktheme from '../../../templates/portfolio/Darktheme';

const Resumetemplates = () => {
  const [filter, setFilter] = useState('All');

  const templates = [
    {
      id: 1,
      name: "Professional Classic",
      tag: "Minimal",
      slug: "Minimal",
      component: <Minimal />,
      description: "Clean lines and perfect white space for modern roles."
    },
    // {
    //   id: 2,
    //   name: "Corporate Executive",
    //   tag: "Classic",
    //   slug: "Classic",
    //   component: <Classic />,
    //   description: "Traditional layout optimized for banking and law."
    // },
    {
      id: 2,
      name: "Modern Simple",
      tag: "Simple",
      slug: "Simple",
      component: <Simple />,
      description: "A friendly, approachable design for creative starters."
    }
  ];

  const filteredTemplates = filter === 'All' 
    ? templates 
    : templates.filter(t => t.tag === filter);

  return (
    <div className='template-selection-page'>
      {/* 1. HEADER SECTION */}
      <header className='template-hero'>
        <div className="resume-offer-badge">🎨 TEMPLATE GALLERY</div>
        <h1 className='template-main-title'>
          Select your <span className="text-highlight">Foundation</span>
        </h1>
        <p className='template-subtitle'>
          Every template is 100% ATS-friendly and designed by career experts.
        </p>
      </header>

      {/* 2. FILTER TABS */}
      <div className="filter-tabs">
        {['All', 'Classic', 'Minimal', 'Simple'].map((cat) => (
          <button 
            key={cat} 
            className={`tab-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. DYNAMIC GRID */}
      <div className='template-grid-modern'>
        {filteredTemplates.map((temp) => (
          <div key={temp.id} className="template-card-wrapper">
            <Link to={`/resumeedit?template=${temp.slug}`} className="resume-card-v2">
              <div className="preview-container">
                <div className="preview-overlay">
                  <span className="btn-use">Use This Template</span>
                </div>
                <div className="resume-scaler">
                  {temp.component}
                </div>
              </div>
              
              <div className="card-details">
                <div className="card-top-info">
                  <h3 className="template-title">{temp.name}</h3>
                  <span className="tag-label">{temp.tag}</span>
                </div>
                <p className="template-desc">{temp.description}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resumetemplates;