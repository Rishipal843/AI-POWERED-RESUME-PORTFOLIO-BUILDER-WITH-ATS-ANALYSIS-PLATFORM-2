import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Navbar.css';
import user_context from '../UseContext';

const Navbar = () => {
  // 1. Get the login state from your Context
  const { islogin, notlogin } = useContext(user_context);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(['token','username']);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [name, setname] = useState("");

  useEffect(() => {
   const fetchuser = async()=>{
    try {
      const email = Cookies.get("username");
      if (!email) return;
      const response = await axios.get(`http://localhost:8000/api/dashboard/${email}`);
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

  // 2. Function to handle logging out

     const handleLogout = () => {
    removeCookie('token', { path: '/' });
    removeCookie('username', { path: '/' });
    setDropdownOpen(false);
    setMenuOpen(false);
    notlogin(false);                     
    navigate('/');            
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };
  
 

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" onClick={closeMobileMenu}>ResumeAI</Link>
      </div>

      <button
        type="button"
        className={`menu-toggle ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/" onClick={closeMobileMenu}>Home</Link></li>
          <li><Link to="/features" onClick={closeMobileMenu}>Features</Link></li>
          {/* <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/templates">Templates</Link></li> */}
          <li><Link to="/about" onClick={closeMobileMenu}>About</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>Contact</Link></li>
          {islogin && <li><Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link></li>}
        </ul>

      {/* <div className="nav-actions">
        {islogin ? (
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="login-link">Log in</Link>
            <Link to="/signup" className="btn-get-started">Get Started</Link>
          </>
        )}
      </div> */}
      <div className="nav-actions">
  {islogin ? (
    <div className="avatar-container">
      <button 
        className="avatar-trigger" 
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img 
          src="https://cdn-icons-png.flaticon.com/128/9187/9187475.png" 
          alt="User Profile" 
          className="avatar-img"
        />
      </button>

      {dropdownOpen && (
        <div className="avatar-dropdown">
          <div className="dropdown-info">
            <p className="user-name">{name}</p>
            <p className="user-email">{Cookies.get("username")}</p>
          </div>
          <hr />
          <button onClick={handleLogout} className="dropdown-item logout-text">
            Logout
          </button>
        </div>
      )}
    </div>
  ) : (
    <>
      <Link to="/login" className="login-link" onClick={closeMobileMenu}>Log in</Link>
      <Link to="/signup" className="btn-get-started" onClick={closeMobileMenu}>Get Started</Link>
    </>
  )}
</div>
      </div>
    </nav>
  );
};

export default Navbar;
