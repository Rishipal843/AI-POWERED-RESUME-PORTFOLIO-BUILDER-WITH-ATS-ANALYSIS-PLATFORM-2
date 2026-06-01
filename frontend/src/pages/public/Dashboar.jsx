import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Dashboar = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(["token"]);
  
  // Since ProtectedRoute only lets verified users in, 
  // you can either pass the user name as a prop or 
  // keep a simple state if you want to fetch extra data.
  
  const handleLogout = () => {
    // Clear the cookie and go to login
    removeCookie("token", { path: '/' });
    navigate("/login");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <div className="dashboard-card">
        <h1>Welcome to your Dashboard! 🚀</h1>
        <p>Your session is verified and secure.</p>
        
        <div style={{ marginTop: "30px", display: "flex", gap: "15px", justifyContent: "center" }}>
          <button 
            onClick={() => navigate("/analyzer")} 
            className="btn-main"
            style={{ padding: "10px 20px", cursor: "pointer" }}
          >
            Go to AI Analyzer
          </button>
          
          <button 
            onClick={handleLogout} 
            style={{ 
              backgroundColor: "#ef4444", 
              color: "white", 
              padding: "10px 20px", 
              border: "none", 
              borderRadius: "5px", 
              cursor: "pointer" 
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboar;