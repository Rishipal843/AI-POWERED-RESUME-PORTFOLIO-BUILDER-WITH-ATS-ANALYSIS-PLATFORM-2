import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './portfoliodetails.css';

const PortfolioDetails = () => {
  const { slug } = useParams();
  const Navigate = useNavigate();
  const [portfolio, setPortfolio] = useState(null);
  const [messages, setMessages] = useState([]); 



  useEffect(() => {


    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/portfolio/${slug}`);
        setPortfolio(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPortfolio();
  }, [slug]);



  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getmessages/${slug}`);
        const result = response.data;

        if (result.statuscode === 1) {
          setMessages(result.data); 
        } else {
          setMessages([]); 
        }
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    if (slug) {
      fetchmessages(); 
    }
  }, [slug]); 

  const deletePortfolio = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/delportfolio/${slug}`);
      if (response.data.statuscode === 1) {
        Navigate(-1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!portfolio) return <h2>Loading...</h2>;

  return (
    <div className="pd-details-container">
      <header className="pd-top-nav">
        <div className="pd-nav-info">
          <h2 className="pd-nav-title">{portfolio.slug}</h2>
          <span className="pd-nav-url">http://localhost:8000/{portfolio.slug}</span>
        </div>
        <div className="pd-nav-actions">
          <button className="pd-btn-secondary" onClick={deletePortfolio}>Delete</button>
          <Link to={`http://localhost:8000/${portfolio.slug}`} className="pd-btn-primary">Open Live Site</Link>
        </div>
      </header>

      <main className="pd-main-content">
        <section className="pd-preview-section">
          <div className="pd-browser-shell">
            <div className="pd-browser-header">
              <div className="pd-dots"><span></span><span></span><span></span></div>
              <div className="pd-address-bar">https://preview-mode.io</div>
            </div>
            <iframe className="pd-iframe-container" src={`http://localhost:8000/${portfolio.slug}`} frameBorder="0"></iframe>
          </div>
        </section>

        {/* Messages Sidebar */}
        <aside className="pd-messages-sidebar">
          <div className="pd-sidebar-header">
            <h3>Messages</h3>
            <span className="pd-badge">{messages.length}</span>
          </div>
          
          <div className="pd-message-feed">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className="pd-message-card">
                  <strong>{msg.senderName}</strong>
                  <p className="pd-msg-email">{msg.senderEmail}</p>
                  <p className="pd-msg-text">{msg.Message}</p>
                  <small>{new Date(msg.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            ) : (
              <div className="pd-empty-state">
                <div className="pd-empty-icon">✉</div>
                <p>No messages yet</p>
                <small>Inbound leads will appear here.</small>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PortfolioDetails;