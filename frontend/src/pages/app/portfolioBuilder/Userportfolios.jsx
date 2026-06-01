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
          `https://ai-powered-resume-portfolio-builder-with.onrender.com/api/user-portfolios/${email}`
        );
        
        // SORTING LOGIC: Newest first based on createdAt
        const sortedData = res.data.data.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        setSavedPortfolios(sortedData);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    fetchUserPortfolios();
  }, []);

  if (loading) {
    return (
      <div className="pb-flex-center" style={{ height: '100vh' }}>
        <h2>Loading portfolios...</h2>
      </div>
    );
  }

  return (
    <div className="pb-gallery-wrapper">
      <header className="pb-gallery-header">
        <h1 className="pb-main-title">My Built Portfolios</h1>
        <p className="pb-sub-title">
          Manage and edit your existing professional showcases
        </p>
      </header>

      <div className="pb-cards-grid">
        {/* Always show the "Create New" card */}
        <Link
          to="/portfoliotemplate"
          className="pb-card pb-add-new-card"
          style={{ textDecoration: "none" }}
        >
          <div className="pb-preview-box pb-flex-center">
            <h1 className="pb-plus-icon">+</h1>
          </div>
          <div className="pb-card-info">
            <h3 className="pb-item-title">Create New</h3>
          </div>
        </Link>

        {/* Map through portfolios if they exist */}
        {savedPortfolios.length > 0 ? (
          savedPortfolios.map((item) => {
            const TemplateComponent = Portfolioregistry[item.template];

            return (
              <div key={item._id} className="pb-card">
                <div className="pb-preview-box">
                  <div className="pb-iframe-shield"></div>
                  <div className="pb-iframe-element">
                    {TemplateComponent ? (
                      <TemplateComponent data={item} />
                    ) : (
                      <div className="pb-flex-center" style={{ height: '100%' }}>
                        <p>Template not found</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pb-card-info">
                  <h3 className="pb-item-title">{item.slug || "Untitled Project"}</h3>
                  <div className="pb-action-links">
                    <Link to={`/portfoliodetails/${item.slug}`}>View</Link>
                    <span className="pb-sep">|</span>
                    <Link to={`/portfolioupdate?id=${item._id}`}>Edit</Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          /* This handles the case where there are no saved portfolios */
          <div className="pb-no-data-msg">
            <p>You haven't built any portfolios yet. Click the + card to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userportfolios;