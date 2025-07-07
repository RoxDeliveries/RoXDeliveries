import React from 'react';
import { useCart } from '../data/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingTopBar from '../Components/FloatingTopBar';

const CartSummaryPage: React.FC = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    toast.success("Your cart has been cleared!");
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <div style={{
          padding: '1.5em 2em',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(219, 42, 42, 0.1)',
          background: '#fdfdfd',
          textAlign: 'center',
          color: '#555',
          fontSize: '12.2rem'
        }}>
          🛒 <strong>Your cart is empty!</strong>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🛒 Cart Summary</h1>
      {cart.map(item => (
        <div key={item.id} style={{ display: 'flex', alignItems: 'center', margin: '1em 0' }}>
          <div style={{ flex: 1 }}>{item.name}</div>
          <button onClick={() => removeFromCart(item)}>–</button>
          <span style={{ margin: '0 8px' }}>{item.quantity}</span>
          <button onClick={() => addToCart(item)}>+</button>
        </div>
      ))}

      <button onClick={clearCart} style={{ marginTop: '1em', backgroundColor: '#f44336', color: 'white', padding: '0.5em 1em', border: 'none', borderRadius: 4 }}>
        Clear Cart
      </button>

      <br /><br />
      <button style={{ backgroundColor: '#4CAF50', color: 'white', padding: '0.5em 1em', border: 'none', borderRadius: 4 }}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummaryPage;
