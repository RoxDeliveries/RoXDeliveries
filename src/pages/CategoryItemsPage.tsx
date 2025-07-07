// src/pages/CategoryItemsPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import itemsByCategory from '../data/itemsByCategory';
import { useCart } from '../data/CartContext';
import FloatingTopBar from '../Components/FloatingTopBar';

const CategoryItemsPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const { cart, addToCart, removeFromCart } = useCart();

  const decoded = decodeURIComponent(categoryName || '');
  const names = itemsByCategory[decoded];
  if (!names) return <div>Category "{decoded}" not found.</div>;

  const sortedNames = names.sort((a, b) => a.localeCompare(b));
  const quantityOf = (id: string) =>
    cart.find(x => x.id === id)?.quantity || 0;

  return (
    <div style={{ paddingTop: '70px' }}>
      <FloatingTopBar />
      <div style={styles.container}>
        <h1 style={styles.heading}>{decoded}</h1>

        <div style={styles.itemsList}>
          {sortedNames.map((name) => {
            const item = { id: name, name };
            return (
              <div key={name} style={styles.itemContainer}>
                <div style={styles.itemDetails}>
                  <div style={styles.itemName}>{name}</div>
                </div>
                <div style={styles.itemActions}>
                  <button style={styles.button} onClick={() => removeFromCart(item)}>-</button>
                  <span style={styles.quantity}>{quantityOf(name)}</span>
                  <button style={styles.button} onClick={() => addToCart(item)}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: "0px",
    backgroundColor: "#fff",
    minHeight: "100vh",
    paddingBottom: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading: {
    fontSize: '28px',
    textAlign: 'center',
    margin: '0px 0',
    color: '#333',
    fontWeight: 'bold',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1px',
    width: '100%',
    maxWidth: '400px',
    padding: '0 10px',
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(46, 4, 4, 0.1)',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  quantity: {
    fontSize: '16px',
    color: '#333',
    fontWeight: 'bold',
  }
};

export default CategoryItemsPage;
