// src/App.tsx
import './App.css';
import logo from './assets/images/RoX.jpg';
import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import CartButton from './Components/CartButton';
import './Components/CategoryMenu.css';
import itemsByCategory from './data/itemsByCategory';

const App: React.FC = () => {
  const categories = [
    'Fresh Fruits', 'Fresh Vegetables', 'Dairy Items',
    'Groceries', 'Snacks', 'Beverages',
    'Stationery', 'Electronics', 'Paan Items',
  ];

  const [customOrder, setCustomOrder] = useState('');
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [loggedInName, setLoggedInName] = useState<string | null>(null);

  const allItems = Object.values(itemsByCategory).flat();

  useEffect(() => {
    const phone = localStorage.getItem('loggedInUser');
    const name = localStorage.getItem('loggedInName');
    const storedCustomOrder = localStorage.getItem('customItem');

    if (!phone || !name) navigate('/login');
    else {
      setLoggedInUser(phone);
      setLoggedInName(name);
    }

    if (storedCustomOrder) {
      setCustomOrder(storedCustomOrder);
    }
  }, [navigate]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search)}`);
      setSearch('');
      setSuggestions([]);
    }
  };

  const handleChange = (value: string) => {
    setSearch(value);
    const query = value.toLowerCase();
    const filtered = allItems.filter(item => item.toLowerCase().includes(query));
    setSuggestions(filtered.slice(0, 6));
  };

  const handleCustomOrder = () => {
    if (customOrder.trim()) {
      navigate('/checkout', { state: { customItem: customOrder.trim() } });
      setCustomOrder('');
      localStorage.removeItem('customItem');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInName');
    navigate('/login');
  };

  return (
    <div style={{
      padding: '2rem', background: 'linear-gradient(to bottom right, rgb(16,14,179), rgb(255,1,14))',
      minHeight: '100vh', paddingBottom: '140px', color: '#fff', position: 'relative',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <img src={logo} alt="RoX Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
        {loggedInUser && (
          <div style={{
            textAlign: 'left',
            backgroundColor: 'rgba(222, 228, 44, 0.1)',
            padding: '10px 16px',
            borderRadius: '12px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            fontSize: '0.9rem',
            lineHeight: 1.4
          }}>
            <div style={{ marginBottom: '4px' }}>
              👤 <strong>{loggedInName}</strong><br />
              📱 {loggedInUser}
            </div>
            <button
              onClick={handleLogout}
              style={{
                padding: '6px 12px',
                backgroundColor: '#ff4d4f',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.85rem',
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>

      <h1 style={{ textAlign: 'center' }}>🛒 RoX Deliveries</h1>

      {/* Search bar */}
      <div style={{ textAlign: 'center', margin: '20px auto', maxWidth: '600px', position: 'relative' }}>
        <input
          value={search}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search items..."
          style={{
            width: '85%',
            padding: '12px',
            fontSize: '18px',
            borderRadius: '30px',
            border: '1px solid #ccc',
            textAlign: 'center',
          }}
        />
        {search && suggestions.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#fff',
            color: '#000',
            border: '1px solid #ccc',
            borderRadius: '10px',
            marginTop: '4px',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {suggestions.map((item, i) => (
              <div key={i} onClick={() => {
                navigate(`/search?query=${encodeURIComponent(item)}`);
                setSearch('');
                setSuggestions([]);
              }} style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>{item}</div>
            ))}
          </div>
        )}
      </div>

      <p style={{ textAlign: 'center' }}>Select a category to start shopping:</p>

      {/* Category Grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem', marginTop: '2rem',
      }}>
        {categories.map((category) => (
          <Link key={category} to={`/category/${encodeURIComponent(category)}`} style={{
            backgroundColor: 'rgba(255,255,255,0.9)', color: '#333', borderRadius: '150px',
            padding: '0.7rem', textAlign: 'center', fontWeight: 'bold', textDecoration: 'none',
            boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
          }}>
            {category}
          </Link>
        ))}
      </div>

      <CartButton />

      {/* Custom Order Banner */}
      <div style={{
        position: 'fixed', bottom: '70px', left: 0, width: '100%', backgroundColor: 'yellow',
        color: 'black', fontWeight: 'bold', fontSize: '1.2rem', textAlign: 'center',
        padding: '1rem', boxShadow: '0 -2px 10px rgba(0,0,0,0.2)', zIndex: 1000,
      }}>
        🔍 Write down your Special Order below and get it delivered!
      </div>

      {/* Floating Input */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: '#fff',
        display: 'flex', padding: '10px', boxShadow: '0 -2px 6px rgba(0,0,0,0.2)', zIndex: 999,
      }}>
        <input
          type="text"
          value={customOrder}
          onChange={(e) => {
            setCustomOrder(e.target.value);
            localStorage.setItem('customItem', e.target.value);
          }}
          placeholder="Enter Special Order..."
          style={{
            flex: 1, padding: '10px', fontSize: '16px', border: '2px solid #ccc',
            borderRadius: '50px', marginRight: '10px',
          }}
        />
        <button onClick={handleCustomOrder} disabled={!customOrder.trim()} style={{
          backgroundColor: '#4CAF50', color: 'white', padding: '10px 60px',
          border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer',
        }}>
          Order
        </button>
      </div>
    </div>
  );
};

export default App;
