// src/pages/CheckoutPage.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../data/CartContext';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { cart, clearCart } = useCart();
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [customItem, setCustomItem] = useState('');
  const navigate = useNavigate();
  const route = useLocation();

  const name = localStorage.getItem('loggedInName') || '';
  const phone = localStorage.getItem('loggedInUser') || '';

  useEffect(() => {
    // ✅ Restore customItem from route or localStorage
    const saved = route.state?.customItem || localStorage.getItem('customItem') || '';
    setCustomItem(saved);
  }, [route.state]);

  useEffect(() => {
    let cancelled = false;

    if (useCurrentLocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          if (!cancelled) {
            const url = `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;
            setLocation(url);
            setLoading(false);
          }
        },
        () => {
          if (!cancelled) {
            setErrorMessage('Unable to fetch location');
            setLoading(false);
          }
        }
      );
    } else {
      setLocation('');
    }

    return () => {
      cancelled = true;
    };
  }, [useCurrentLocation]);

  const submitOrderToSheet = async (order: any) => {
<<<<<<< HEAD
    const endpoint = 'https://script.google.com/macros/s/AKfycbyeeXFf9J8wpdUIrMK24sRK4HxkefJCv7z6mgQQTy7AVCHqob4TnkNlPb0YQNDJ7mj0/exec';
=======
    const endpoint = 'https://script.google.com/macros/s/AKfycby8MF352H19yGoD1oXkLa3WhbSYGUtAPw3atXPB7D1ZHvTZT8gR8UPgT4M2lA2uyRed/exec';
>>>>>>> d47469a679691045e35e8ca76439b2e8ff25d564
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(order),
      });
      const result = await res.json();
      return result.success;
    } catch (err) {
      console.error('❌ Error:', err);
      return false;
    }
  };

  const handlePlaceOrder = async () => {
    setErrorMessage('');
    if (!name || !phone || !location) {
      setErrorMessage('Please enter the Location details and ensure location is set.');
      return;
    }

    if (submitting) return;
    setSubmitting(true);

    const order: any = {
      name,
      phone,
      location,
    };

    if (cart.length > 0) {
      order.items = cart.map((item) => ({
        name: item.name,
        qty: item.quantity,
      }));
    }

    if (customItem.trim()) {
      order.customItem = customItem.trim();
    }

    const success = await submitOrderToSheet(order);

    if (success) {
      clearCart();
      localStorage.removeItem('customItem'); // ✅ Clean up after order

      navigate('/order-confirmation', {
        state: {
          location,
          items: cart.length > 0 ? cart : null,
          customItem: customItem || null,
        },
      });
    } else {
      setErrorMessage(`
        <div style="text-align: center; font-size: 16px; font-weight: 500; color: #b00020; background-color: #ffe6e6; padding: 12px 16px; border-radius: 10px; margin-top: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
          ❌ <strong>Order could not be placed due to Network issue.</strong><br />
          Please try again or call our <strong style="color:#d32f2f;">Customer Care</strong><br />
          at <strong style="font-size: 18px; color:rgb(10, 56, 209);">📞 8917317097</strong> to place your order.
        </div>
      `);
    }

    setSubmitting(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 420, margin: '0 auto', fontFamily: 'Segoe UI' }}>
      <h1>Checkout</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
        <button
          onClick={() => setUseCurrentLocation(true)}
          style={{
            backgroundColor: useCurrentLocation ? '#28a745' : '#ccc',
            color: useCurrentLocation ? '#fff' : '#000',
            padding: '10px 16px',
            borderRadius: 6,
          }}
        >
          📍 Current Location
        </button>
        <button
          onClick={() => setUseCurrentLocation(false)}
          style={{
            backgroundColor: !useCurrentLocation ? '#007bff' : '#ccc',
            color: !useCurrentLocation ? '#fff' : '#000',
            padding: '10px 16px',
            borderRadius: 6,
          }}
        >
          📝 Enter Address
        </button>
      </div>

      {useCurrentLocation ? (
        <div>{loading ? 'Fetching...' : <a href={location} target="_blank" rel="noreferrer">{location}</a>}</div>
      ) : (
        <textarea
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: '100%', padding: 10, borderRadius: 8 }}
        />
      )}

      {errorMessage && (
        <div dangerouslySetInnerHTML={{ __html: errorMessage }} />
      )}

      <button
        onClick={handlePlaceOrder}
        disabled={submitting}
        style={{
          background: submitting ? '#aaa' : '#28a745',
          color: '#fff',
          width: '100%',
          padding: '12px 20px',
          borderRadius: 10,
          marginTop: 20,
          fontWeight: 'bold',
          fontSize: 16,
          cursor: submitting ? 'not-allowed' : 'pointer',
        }}
      >
        {submitting ? '⏳ Placing Order...' : '🚀 Place Order'}
      </button>
    </div>
  );
};

export default CheckoutPage;
