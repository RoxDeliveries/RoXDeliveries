// src/Components/HomeButton.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomeButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on the home page (/)
  if (location.pathname === '/') return null;

  return (
    <button
      onClick={() => navigate('/')}
      style={{
        position: 'fixed',
        top: 10,
        left: 10,
        zIndex: 1000,
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '6px',
        padding: '6px 12px',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      }}
    >
      ⬅ Home
    </button>
  );
};

export default HomeButton;
