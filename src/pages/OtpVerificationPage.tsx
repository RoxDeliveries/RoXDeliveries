import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthStyles.css';

const OtpVerificationPage: React.FC = () => {
  const { state } = useLocation();
  const phone = state?.phone;
  const from = state?.from;
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = () => {
    if (otp !== '1234') {
      setError('Invalid OTP. Please try 1234 for testing.');
      return;
    }

    setError('');
    if (from === 'forgot-pin') {
      navigate('/setup-pin', { state: { phone, reset: true } });
    } else {
      navigate('/setup-pin', { state: { phone } });
    }
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-container">
        <h2>🔐 OTP Verification</h2>
        <p className="auth-subtext">Phone: {phone}</p>
        <input
          type="text"
          placeholder="Enter OTP (1234)"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
          maxLength={4}
          className="auth-input"
        />
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-button" onClick={handleVerifyOtp}>Verify OTP</button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;
