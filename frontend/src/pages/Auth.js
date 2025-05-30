import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../components/Login';
import Register from '../components/Register';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if there's a message in the location state
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage(''); // Clear any messages when toggling forms
  };

  const handleLoginSuccess = () => {
    // If there's a redirectTo in the location state, navigate there after login
    if (location.state?.redirectTo) {
      navigate(location.state.redirectTo);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="auth-container">
      {message && <div className="auth-message">{message}</div>}
      <div className="auth-toggle">
        <button
          className={isLogin ? 'active' : ''}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={!isLogin ? 'active' : ''}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      <div className="auth-form">
        {isLogin ? (
          <Login onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register onRegisterSuccess={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};

export default Auth;
