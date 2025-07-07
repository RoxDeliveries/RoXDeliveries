import React from 'react';
import { useCart } from '../data/CartContext';
import { Link } from 'react-router-dom';
import FloatingTopBar from '../Components/FloatingTopBar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cart.length === 0) {
    toast.success("Your cart has been cleared!");
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', flexDirection: 'column' }}>
        <div style={{
          padding: '1.5em 2em',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          background: '#fdfdfd',
          textAlign: 'center',
          color: '#555',
          fontSize: '1.5rem'
        }}>
          🛒 <strong>Your cart is empty!</strong>
        </div>
  
        <button
          style={{
            marginTop: '1em',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '0.6em 1.2em',
            border: 'none',
            borderRadius: '15px',
            fontSize: '1.2rem',
            cursor: 'pointer'
          }}
          onClick={() => window.location.href = '/'}
        >
          🏠 Go to Home
        </button>
      </div>
    );
  }
  
  return (
    
    <div style={{ paddingTop: '5px' }}> 
      <FloatingTopBar /> 
    <div style={styles.container}>
      <h1 style={styles.title}>🛍️ Your Cart</h1>

      {cart.map(item => (
        <div key={item.id} style={styles.itemCard}>
          <div style={styles.itemName}>{item.name}</div>
          <div style={styles.controls}>
            <button onClick={() => removeFromCart(item)} style={styles.controlButton}>−</button>
            <span style={styles.quantity}>{item.quantity}</span>
            <button onClick={() => addToCart(item)} style={styles.controlButton}>+</button>
          </div>
        </div>
      ))}

      <div style={styles.summary}>
        <p style={styles.totalText}><strong>Total Items:</strong> {totalItems}</p>
        <div style={styles.buttonRow}>
          <button onClick={clearCart} style={styles.clearButton}>🧹 Clear Cart</button>
          <Link to="/checkout" style={styles.checkoutButton}>✅ Checkout</Link>
        </div>
      </div>
    </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 24,
    maxWidth: 400,
    margin: '0 auto',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    marginTop: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    color: '#333',
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#777',
  },
  itemCard: {
    background: '#fff',
    borderRadius: 10,
    padding: '12px 16px',
    marginBottom: 12,
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    color: '#444',
    fontWeight: 500,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  controlButton: {
    padding: '6px 12px',
    fontSize: 16,
    borderRadius: 6,
    border: 'none',
    background: '#ececec',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  quantity: {
    fontSize: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  summary: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: '2px solid #ddd',
    textAlign: 'center',
  },
  totalText: {
    fontSize: 18,
    marginBottom: 16,
    color: '#333',
  },
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
  },
  clearButton: {
    background: '#ff4d4f',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 16,
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(255,77,79,0.3)',
    transition: 'transform 0.1s',
  },
  checkoutButton: {
    background: '#28a745',
    color: 'white',
    textDecoration: 'none',
    borderRadius: 8,
    padding: '10px 16px',
    fontSize: 16,
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(40,167,69,0.3)',
    transition: 'transform 0.1s',
  },
};

export default CartPage;
