// src/components/CartButton.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../data/CartContext';

const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      onClick={() => navigate('/cart')}
      style={{
        position: 'fixed',
        top:10,
        right: 10,
        backgroundColor: 'orange',
        color: 'white',
        padding: '10px 20px',
        borderRadius: 20,
        border: 'none',
        fontWeight: 'bold',
        zIndex: 1000,
      }}
    >
      🛒 Cart ({totalItems})
    </button>

  );
};

export default CartButton;
