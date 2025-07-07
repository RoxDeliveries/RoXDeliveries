// src/pages/SearchResultsPage.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import itemsByCategory from '../data/itemsByCategory';
import { useCart } from '../data/CartContext';
import FloatingTopBar from '../Components/FloatingTopBar';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query')?.toLowerCase() || '';
  const { cart, addToCart, removeFromCart } = useCart();

  const allItems = Object.entries(itemsByCategory)
    .flatMap(([category, items]) =>
      items.map(item => ({ name: item, category }))
    );

  const matchedItems = allItems.filter(({ name }) => name.toLowerCase().includes(query));

  const quantityOf = (name: string) => cart.find(x => x.name === name)?.quantity || 0;

  return (
    <div style={{ paddingTop: 80 }}>
      <FloatingTopBar />

      <div style={styles.container}>
        <h2 style={styles.title}>🔍 Results for "{query}"</h2>

        {matchedItems.length === 0 ? (
          <p style={{ fontSize: 16, textAlign: 'center' }}>No items found.</p>
        ) : (
          <div style={styles.list}>
            {matchedItems.map(({ name, category }) => (
              <div key={name} style={styles.card}>
                <div>
                  <strong style={styles.highlight}>{highlightMatch(name, query)}</strong>
                  <div style={{ fontSize: 12, color: '#555' }}>{category}</div>
                </div>
                <div style={styles.controls}>
                  <button onClick={() => removeFromCart({ id: name, name })} style={styles.button}>-</button>
                  <span>{quantityOf(name)}</span>
                  <button onClick={() => addToCart({ id: name, name})} style={styles.button}>+</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const highlightMatch = (text: string, query: string) => {
  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === query ? <mark key={i}>{part}</mark> : part
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: '20px 16px',
    fontFamily: 'Segoe UI, sans-serif'
  },
  title: {
    fontSize: '22px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    background: '#fff',
    borderRadius: 8,
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  highlight: {
    fontWeight: 'bold',
    fontSize: 16
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  button: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: 4,
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer'
  }
};

export default SearchResultsPage;
