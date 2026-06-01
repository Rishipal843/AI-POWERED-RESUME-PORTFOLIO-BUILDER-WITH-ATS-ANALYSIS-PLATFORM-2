import React, { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import './Auth.css';
import { ToastContainer, toast } from "react-toastify";


const Signup = () => {

  const navigate = useNavigate();
  const [name, setfullname] = useState('')
  const [email, setemail] =useState('')
  const [Password, setpassword] =useState('')


 
  const handleLogin = () => {
    window.open('http://localhost:8000/auth/google', '_self');
  };

  
 const handlesubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:8000/api/register",
      { name, email, Password },
      { withCredentials: true } // ADD THIS LINE
    );
    
    const result = response.data; // Axios doesn't need 'await response.data'

    if (result.statuscode === 1) {
      alert("Account created successfully");
      Cookies.set("username",email,{expires:7})
      navigate("/dashboard");
    } else if (result.statuscode === 3) {
      alert("Email already exists");
    } else {
      alert("Registration failed");
    }
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>
        <p>Join us to start building your professional resume.</p>
        
        <form onSubmit={handlesubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              value={name}            
              required 
              onChange={(e)=>setfullname(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="name@company.com"
              value={email}
              required 
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={Password}
              required 
              onChange={(e)=>setpassword(e.target.value)}
            />
          </div>

          <button  type="submit" className="login-button" >
            Sign Up
          </button>
              <button className="btn-google-auth" onClick={handleLogin}>
  <div className="google-icon-wrapper">
    <img 
      src="https://t3.ftcdn.net/jpg/13/57/32/46/240_F_1357324628_aGvmLJ8MT2cNEkphwZGDz1NH1jjrDvmX.jpg" 
      alt="Google Logo" 
    />
  </div>
  <span className="google-btn-text">Sign in with Google</span>
</button>

        </form>

        <div className="login-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;