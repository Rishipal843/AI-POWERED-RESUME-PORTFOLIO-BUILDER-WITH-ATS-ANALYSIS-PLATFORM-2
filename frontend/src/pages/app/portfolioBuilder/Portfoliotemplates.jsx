import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './portfoliotemplate.css';

// Import your actual template components here
import Darktheme from '../../../templates/portfolio/Darktheme';
// import LightTheme from '../../../templates/portfolio/LightTheme'; 

const Portfoliotemplates = () => {
  // State to trigger a "soft refresh" of the component
  const [refreshKey, setRefreshKey] = useState(0);

  // This data object controls everything. Add a new object here to add a new card.
  const templateData = [
    {
      id: 'Darktheme',
      name: 'Dark Theme',
      component: <Darktheme />,
      description: 'Professional dark aesthetic',
      active: true
    },
    /* {
      id: 'LightTheme',
      name: 'Light Theme',
      component: <LightTheme />,
      description: 'Clean and bright design',
      active: true
    } 
    */
  ];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <div className='template-gallery' key={refreshKey}>
      <header className='gallery-header'>
        <h1>Choose a Portfolio Template</h1>
        <p>Select a design to showcase your professional work</p>
      </header>

      <div className='gallery-grid'>
        {templateData.map((item) => (
          <div className="portfolio-card" key={item.id}>
            <div className="portfolio-preview-container">
              <div className="portfolio-scaler">
                {/* Render the component stored in the object */}
                {item.component}
              </div>
            </div>
            
            <div className="portfolio-card-details">
              <h3 className="portfolio-title">{item.name}</h3>
              <div className="portfolio-links">
                <Link 
                  to={`/preview?template=${item.id}`} 
                  className="link-preview"
                >
                  Preview
                </Link>
                <span className="link-divider">|</span>
                <Link 
                  to={`/portfolioedit?template=${item.id}`} 
                  className="link-build"
                >
                  Build
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Portfoliotemplates;