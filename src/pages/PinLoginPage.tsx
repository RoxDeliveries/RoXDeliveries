import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const PinLoginPage: React.FC = () => {
  const { state } = useLocation();
  const phone = state?.phone;
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!phone) {
      const savedPhone = localStorage.getItem('loggedInUser');
      if (savedPhone) {
        navigate('/pin-login', { state: { phone: savedPhone } });
      } else {
        navigate('/login');
      }
    }
  }, [phone, navigate]);

  const handleLogin = () => {
    const savedPin = localStorage.getItem(`pin-${phone}`);
    if (savedPin === pin) {
      setError('');
      localStorage.setItem('loggedInUser', phone);
      navigate('/');
    } else {
      setError('Invalid PIN. Please try again.');
    }
  };

  const handleForgotPin = () => {
    navigate('/verify-otp', { state: { phone, from: 'forgot-pin' } });
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-container">
        <div className="pin-login-container">
          <h2 className="auth-title">👋 Welcome Back</h2>
          <p className="auth-subtext">Phone: {phone}</p>
          
          <input
            type="password"
            placeholder="Enter 4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            className="auth-input pin-input"
          />
          
          {error && <p className="auth-error">{error}</p>}
          
          <button className="auth-button" onClick={handleLogin}>
            Login
          </button>
          
          <button className="auth-link" onClick={handleForgotPin}>
            Forgot PIN?
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinLoginPage;