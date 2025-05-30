import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // Check if user is authorized to create events
      const userRole = localStorage.getItem('userRole');
      setIsAuthorized(userRole === 'creator' || userRole === 'admin');
      setIsAdmin(userRole === 'admin');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setIsAuthorized(false);
    setIsAdmin(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">EventOnClick</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthorized && <li><Link to="/create-event">Create Event</Link></li>}
          {isLoggedIn ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              {isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>}
              <li><button onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/auth">Login / Register</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
