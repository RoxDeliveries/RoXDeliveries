import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const ForgotPinPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = React.useState('');

  const handleForgot = () => {
    if (!/^\d{10}$/.test(phone)) return alert('Enter a valid phone number');
    navigate('/verify-otp', { state: { phone, from: 'forgot-pin' } });
  };

  return (
    <div className="auth-container">
      <h2>🔐 Forgot Your PIN?</h2>
      <input
        type="tel"
        placeholder="Enter your phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
        maxLength={10}
        className="auth-input"
      />
      <button className="auth-button" onClick={handleForgot}>Send OTP</button>
    </div>
  );
};

export default ForgotPinPage;
