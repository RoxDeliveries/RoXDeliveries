import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PlaceOrderPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state || { item: '' };

  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [locationURL, setLocationURL] = useState('');
  const [manualAddress, setManualAddress] = useState('');

  useEffect(() => {
    if (useCurrentLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocationURL(`https://www.google.com/maps?q=${latitude},${longitude}`);
        },
        (error) => {
          console.error('Location access failed:', error);
          setUseCurrentLocation(false);
        }
      );
    }
  }, [useCurrentLocation]);

  const isValidOrder = () => {
    return item.trim() !== '' && (useCurrentLocation ? locationURL : manualAddress.trim() !== '');
  };

  const handlePlaceOrder = () => {
    const locationText = useCurrentLocation ? locationURL : manualAddress;
    navigate('/order-confirmation', {
      state: {
        item,
        location: locationText,
      },
    });
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', backgroundColor: 'white', textAlign: 'center' }}>
      <h2><strong>Checkout</strong></h2>

      {/* Toggle buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setUseCurrentLocation(true)} style={{ backgroundColor: useCurrentLocation ? '#28a745' : '#ccc', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          📍 Current Location
        </button>
        <button onClick={() => setUseCurrentLocation(false)} style={{ backgroundColor: !useCurrentLocation ? '#6c757d' : '#ccc', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          📝 Enter Address
        </button>
      </div>

      {/* Address or GPS URL */}
      {useCurrentLocation ? (
        <div style={{ marginBottom: '1rem' }}>
          {locationURL ? (
            <a href={locationURL} target="_blank" rel="noopener noreferrer">
              {locationURL}
            </a>
          ) : (
            <p>Fetching location...</p>
          )}
        </div>
      ) : (
        <input
          type="text"
          placeholder="Enter your address"
          value={manualAddress}
          onChange={(e) => setManualAddress(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '1rem' }}
        />
      )}

      <button
        onClick={handlePlaceOrder}
        style={{ backgroundColor: '#28a745', color: 'white', padding: '0.75rem 1rem', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '16px' }}
        disabled={!isValidOrder()}
      >
        🚀 Place Order
      </button>
    </div>
  );
};

export default PlaceOrderPage;
