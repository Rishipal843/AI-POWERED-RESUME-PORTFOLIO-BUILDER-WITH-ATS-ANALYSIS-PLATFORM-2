import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Dashboard.css";
import axios from 'axios';
import Cookies from 'js-cookie';


const Dashboard = () => {


  // const userPlan = 'free'; 
  // const scanLimit = userPlan === 'paid' ? 20 : 3;
  // const scansUsed = 2;

  
  // const scanPercentage = (scansUsed / scanLimit) * 100;

  const [name, setname] = useState("");
  const [porfolios, setportfolios] = useState([])
    const livePortfolios = porfolios


useEffect(() => {
   const fetchuser = async()=>{
    try {
      const email = Cookies.get("username");
      const response = await axios.get(`https://ai-powered-resume-portfolio-builder-with.onrender.com/api/dashboard/${email}`);
      const result = response.data;
      if(result.statuscode === 1){
        setname(result.data.name)
      }else{
        console.log(result.message);
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  fetchuser()
}, [])

useEffect(() => {
    const fetchportfolios = async()=>{
            const email = Cookies.get("username");
      const response = await axios.get(`https://ai-powered-resume-portfolio-builder-with.onrender.com/api/dashboardportfolios/${email}`);
      const result = response.data;
      if(result.statuscode === 1){
        setportfolios(result.data.length)
      }else{
        console.log(result.message);
      }
    }
    fetchportfolios()
}, [])
 


  return (
    <div className="dashboard-wrapper">
      {/* 1. WELCOME HEADER */}
      <header className="dash-header">
        <div className="header-text">
          <h1>Welcome back, <span className="text-highlight">{name}</span> 👋</h1>
          <p>Your career progress is looking great. Here's what's happening.</p>
        </div>
       
      </header>

      {/* 2. PRIMARY ACTION CARDS (Redesigned) */}
      <div className="action-row">
        <Link to="/uploadresume" className="action-card-modern teal-glow">
          <div className="action-icon-bg">🔍</div>
          <div className="action-info">
            <h3>Analyze Resume</h3>
            <p>Check ATS compatibility</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>

        <Link to="/Resumetemplates" className="action-card-modern blue-glow">
          <div className="action-icon-bg">📄</div>
          <div className="action-info">
            <h3>Build Resume</h3>
            <p>Create professional CVs</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>

        <Link to="/userportfolios" className="action-card-modern pink-glow">
          <div className="action-icon-bg">✨</div>
          <div className="action-info">
            <h3>Create Portfolio</h3>
            <p>Showcase your work</p>
          </div>
          <span className="action-arrow">→</span>
        </Link>
      </div>

      {/* 3. OVERVIEW STATISTICS */}
      <section className="dashboard-analytics-section">
  <div className="analytics-header">
    <h3>Activity Overview</h3>
    <div className="live-status">
      <span className="pulse-dot"></span> System Live
    </div>
  </div>

  <div className="analytics-grid">
    
    {/* 1. DYNAMIC SCANS CARD */}
    {/* <div className="analytics-card">
      <div className="card-top">
        <span className="card-label">Monthly Scans</span>
        <span className={`plan-pill ${userPlan}`}>
          {userPlan === 'paid' ? 'PRO PLAN' : 'FREE PLAN'}
        </span>
      </div>
      
      <div className="progress-visual">
        <div 
          className="circle-chart" 
          style={{
            background: `conic-gradient(#f15a24 ${(scansUsed / scanLimit) * 100}%, #f0f2f5 0)`
          }}
        >
          <div className="circle-inner">
            <span className="current-val">{scansUsed}/{scanLimit}</span>
            <p className="unit-label">Scans Used</p>
          </div>
        </div>
      </div>
      
      <div className="card-footer">
        {userPlan === 'free' ? (
          <Link to="/pricing" className="upgrade-link">Upgrade for 20 scans →</Link>
        ) : (
          <span className="limit-info">Next reset in 12 days</span>
        )}
      </div>
    </div> */}

    {/* 2. LIVE PORTFOLIO CARD */}
    <div className="analytics-card">
      <div className="card-top">
        <span className="card-label">Your Presence</span>
        <span className="status-badge">ACTIVE</span>
      </div>
      
      <div className="portfolio-stat-main">
        <div className="huge-number">{livePortfolios}</div>
        <div className="stat-text-group">
          <strong>Live Portfolios</strong>
          <p>Publicly reachable</p>
        </div>
      </div>

      <Link to="/userportfolios" className="manage-btn">
        Manage Portfolios
      </Link>
    </div>

    {/* 3. IMPACT CARD */}
    <div className="analytics-card">
      <div className="card-top">
        <span className="card-label">Profile Views</span>
      </div>
      <div className="impact-content">
        <div className="huge-number">128</div>
        <p className="impact-sub">Recruiter views this month</p>
        <div className="mini-bar-chart">
          <div className="chart-bar" style={{height: '40%'}}></div>
          <div className="chart-bar" style={{height: '75%'}}></div>
          <div className="chart-bar" style={{height: '55%'}}></div>
          <div className="chart-bar" style={{height: '90%'}}></div>
          <div className="chart-bar active" style={{height: '65%'}}></div>
        </div>
      </div>
    </div>

  </div>
</section>
    </div>
  );
};

export default Dashboard;