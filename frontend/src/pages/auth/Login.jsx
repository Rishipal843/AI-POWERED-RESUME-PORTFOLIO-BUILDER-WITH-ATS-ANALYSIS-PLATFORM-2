import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Auth.css';
import { useContext } from 'react';
import user_context from '../../UseContext';
import axios from 'axios';
import Cookies from "js-cookie"
const Login = () => {
  const {setemail} = useContext(user_context)
const {notlogin}=useContext(user_context)
  const navigate = useNavigate();

useEffect(()=>{
  notlogin(false)
},[])


const [email,setEmail]=useState('')
const [Password,setPassword]=useState('')

 // Clear email on login page load

  const handleLogin = () => {
    window.open('http://localhost:8000/auth/google', '_self');
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const request = await axios.post(
      "http://localhost:8000/api/login",
      { email, Password },
      { withCredentials: true }
    );
    
    if (request.data.statuscode === 1) {
      notlogin(true); // Navbar updates immediately
      // Use a small delay or toast if navigate is too fast for context
      setTimeout(() => {
        navigate("/dashboard"); // Navigate to dashboard, not home
      }, 100);
      Cookies.set("username",email,{expires:7})
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    console.log(err);
  }
};



  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Please enter your details to sign in.</p>
        
        <form onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="name@company.com" 
              required 
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              required 
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className='login-forgot'>
              <Link to="/forgot-password">Forgot password?</Link>
          </div>
        
          <button type="submit" className="login-button">Sign In</button>
          
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
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;