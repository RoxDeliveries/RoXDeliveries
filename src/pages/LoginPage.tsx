import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthStyles.css';

const EMOJIS = [
  '🎁', '🍎', '🍔', '🍬', '🛍️', '🧸', '🛒', '📦', '🍕', '🍭',
  '🍇', '🍋', '🥩', '🍫', '🍞', '🧃', '🍩', '🍓', '🥒', '🍉',
  '🧴', '🪥', '🍪', '🍦', '🥤', '🥕', '🍗', '🧃', '🍑', '🍅',
  '🎈', '🎀', '📱', '🎮', '🎁', '🧸', '🧩', '📚', '🖥️', '🎧'
];

const LoginPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const emojiPositions = useMemo(() =>
    EMOJIS.map((emoji) => ({
      emoji,
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.8 + Math.random() * 0.4
    })), []
  );

  const handleSend = () => {
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    setError('');

    // ✅ Save both name and phone to localStorage
    localStorage.setItem('loggedInName', name.trim());
    localStorage.setItem('loggedInUser', phone);

    const hasPin = localStorage.getItem(`pin-${phone}`);
    navigate(hasPin ? '/pin-login' : '/verify-otp', { state: { phone } });
  };

  return (
    <div className="page-wrapper auth-page">
      <div className="emoji-bg">
        {emojiPositions.map(({ emoji, top, left, delay, scale }, i) => (
          <span
            key={i}
            className="emoji"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${delay}s`,
              transform: `scale(${scale})`
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="auth-container">
        <h2 className="auth-title">RoX Deliveries</h2>
        <h2 className="auth-subtitle">Login with your Phone Number to get started!</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="auth-input"
        />

        <input
          type="tel"
          placeholder="Enter 10-digit phone"
          value={phone}
          onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
          maxLength={10}
          className="auth-input"
        />

        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" onClick={handleSend}>Continue</button>
      </div>
    </div>
  );
};

export default LoginPage;
