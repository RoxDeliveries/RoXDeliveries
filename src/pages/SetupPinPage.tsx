import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthStyles.css';

const SetupPinPage: React.FC = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const phone = localStorage.getItem('loggedInUser');

  const handleSetPin = () => {
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError('PIN must be a 4-digit number.');
      return;
    }
    if (pin !== confirmPin) {
      setError('PINs do not match.');
      return;
    }

    if (phone) {
      localStorage.setItem(`pin-${phone}`, pin);
      navigate('/');
    } else {
      setError('User not found.');
    }
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="auth-container">
        <h2 className="auth-title">Set Your PIN</h2>
        <p className="auth-subtitle">Create a 4-digit PIN to secure your login.</p>

        <input
          type="password"
          maxLength={4}
          placeholder="Enter 4-digit PIN"
          className="auth-input"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
        />
        <input
          type="password"
          maxLength={4}
          placeholder="Confirm PIN"
          className="auth-input"
          value={confirmPin}
          onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
        />

        {error && <p className="auth-error">{error}</p>}
        <button className="auth-button" onClick={handleSetPin}>Set PIN</button>
      </div>
    </div>
  );
};

export default SetupPinPage;
