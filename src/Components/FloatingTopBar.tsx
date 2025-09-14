import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryMenuButton from './CategoryMenu';
import CartButton from './CartButton';
import { useCart } from '../data/CartContext';
import itemsByCategory from '../data/itemsByCategory';
import './FloatingTopBar.css';

const FloatingTopBar: React.FC = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useCart();
  const allItems = Object.values(itemsByCategory).flat();

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    setRecentSearches(history);
  }, []);

  const saveSearchTerm = (term: string) => {
    const updated = [term, ...recentSearches.filter(t => t !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (search.trim()) {
      saveSearchTerm(search.trim());
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSuggestions([]);
      setShowHistory(false);
    }
  };

  const handleChange = (value: string) => {
    setSearch(value);
    setShowHistory(false);

    const query = value.toLowerCase();
    const filtered = allItems.filter(item => item.toLowerCase().includes(query));
    setSuggestions(filtered.slice(0, 10000));
  };

  const quantityOf = (name: string) => cart.find(item => item.name === name)?.quantity || 0;

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <CategoryMenuButton />
      </div>

      <div className="search-area">
        <button 
          className="home-btn" 
          onClick={() => navigate('/')}
          aria-label="Go to home page"
        >
          🏠
        </button>
        
        <div className="search-container">
          <input
            className="search-input"
            placeholder="Search items..."
            value={search}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              if (!search) setShowHistory(true);
            }}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch} className="search-btn">🔍</button>

          {/* Suggestions */}
          {search && suggestions.length > 0 && (
            <div className="dropdown suggestions-dropdown">
              {suggestions.map((item, index) => (
                <div key={index} className="dropdown-item">
                  <div className="item-row">
                    <span>{item}</span>
                    <div className="item-controls">
                      <button onClick={() => removeFromCart({ id: item, name: item })} className="control-btn">-</button>
                      <span>{quantityOf(item)}</span>
                      <button onClick={() => addToCart({ id: item, name: item})} className="control-btn">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {showHistory && recentSearches.length > 0 && (
            <div className="dropdown history-dropdown">
              <div className="dropdown-header">Recent Searches</div>
              {recentSearches.map((term, index) => (
                <div
                  key={index}
                  className="dropdown-item clickable"
                  onClick={() => {
                    setSearch(term);
                    handleSearch();
                  }}
                >
                  {term}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="top-bar-right">
        <CartButton />
      </div>
    </div>
  );
};

export default FloatingTopBar;