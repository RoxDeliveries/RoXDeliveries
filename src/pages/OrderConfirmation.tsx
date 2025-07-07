import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';

const OrderConfirmationPage: React.FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { items, customItem, location: deliveryLocation } = state || {};

  const [width, height] = useWindowSize();

  useEffect(() => {
    // Clear cart from localStorage on mount
    localStorage.removeItem('cartItems');
  }, []);

  const hasItems = items?.length > 0;
  const hasCustomItem = !!customItem;
  const hasLocation = !!deliveryLocation;

  const isMissingData = !hasItems && !hasCustomItem && !hasLocation;

  if (isMissingData) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>⚠️ Missing Order Info</h2>
        <p>We couldn't find your order details or delivery location.</p>
        <button
          onClick={() => navigate('/')}
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            backgroundColor: '#007bff',
            color: 'white',
            fontSize: 16,
            cursor: 'pointer',
            marginTop: '1rem',
          }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Confetti width={width} height={height} recycle={false} numberOfPieces={250} />
      <h1 style={styles.title}>🎉 Order Placed Successfully!</h1>

      {hasItems && (
        <>
          <p style={styles.info}>🛒 Cart Items:</p>
          <div style={styles.orderBox}>
            <ul style={{ margin: 0, paddingLeft: 20, textAlign: 'left' }}>
              {items.map((item: any, index: number) => (
                <li key={index}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {hasCustomItem && (
        <>
          <p style={styles.info}>📝 Custom Order:</p>
          <div style={styles.orderBox}>{customItem}</div>
        </>
      )}

      {hasLocation && (
        <>
          <p style={styles.info}>📍 Delivery Location:</p>
          <div style={styles.locationBox}>
            {typeof deliveryLocation === 'string' && deliveryLocation.startsWith('http') ? (
              <a
                href={deliveryLocation}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                {deliveryLocation}
              </a>
            ) : (
              <p style={styles.link}>{deliveryLocation}</p>
            )}
          </div>
        </>
      )}

      <p style={styles.info}>⏱ Estimated Delivery Time: 20–30 mins</p>

      <button onClick={() => navigate('/')} style={styles.button}>
        Place a New Order 🏠
      </button>

      {/* ✅ Added Logout Button */}
      <button
        onClick={() => {
          localStorage.removeItem('loggedInUser');
          localStorage.removeItem('loggedInName');
          navigate('/login');
        }}
        style={{ ...styles.button, backgroundColor: '#dc3545', marginTop: 12 }}
      >
        🔓 Logout
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: 40,
    maxWidth: 500,
    margin: '50px auto',
    background: '#f0fff0',
    borderRadius: 12,
    textAlign: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    color: '#28a745',
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  orderBox: {
    background: '#fff',
    padding: '12px 16px',
    borderRadius: 8,
    marginBottom: 20,
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
    fontSize: 14,
    color: '#333',
  },
  locationBox: {
    background: '#fff',
    padding: '12px 16px',
    borderRadius: 8,
    marginBottom: 20,
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
  },
  link: {
    fontSize: 14,
    color: '#007bff',
    wordBreak: 'break-word',
    textDecoration: 'none',
  },
  button: {
    padding: '15px 50px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    fontSize: 16,
  },
};

export default OrderConfirmationPage;
