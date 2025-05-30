import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <Link to="/">EventOnClick</Link>
          <p>Discover events happening around you</p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h3>For Users</h3>
            <ul>
              <li><Link to="/">Browse Events</Link></li>
              <li><Link to="/auth">Login / Register</Link></li>
              <li><Link to="/dashboard">My Dashboard</Link></li>
            </ul>
          </div>

          <div className="link-group">
            <h3>For Event Creators</h3>
            <ul>
              <li><Link to="/create-event">Create Event</Link></li>
              <li><Link to="/dashboard">Manage Events</Link></li>
              <li><a href="#">Promotion Tips</a></li>
            </ul>
          </div>

          <div className="link-group">
            <h3>About</h3>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EventOnClick. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
