import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  
import { CSSProperties } from 'react';  

const categories = [
  'Fresh Fruits', 'Fresh Vegetables', 'Dairy Items',
  'Groceries', 'Snacks', 'Beverages', 'Stationery',
  'Electronics', 'Paan Items'
];

const CategoryMenuButton: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const goToCategory = (name: string) => {
    navigate(`/category/${encodeURIComponent(name)}`);
    setOpen(false);
  };

  return (
    <div style={styles.wrapper}>
      <button onClick={toggleMenu} style={styles.button}>☰ Categories</button>

      {open && (
        <div style={styles.menu}>
          {categories.map((cat) => (
            <div key={cat} style={styles.item} onClick={() => goToCategory(cat)}>
              {cat}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
 
const styles = {
  wrapper: {
    position: 'fixed' as 'fixed', 
const styles: {
  wrapper: CSSProperties;
  button: CSSProperties;
  menu: CSSProperties;
  item: CSSProperties;
} = {
  wrapper: {
    position: 'fixed',  
    top: 10,
    left: 10,
    zIndex: 1000,
  },
  button: {
    padding: '10px 16px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  menu: { 
    position: 'fixed' as 'fixed', // 💡 this is key
    top: 60, // appear below button
    left: 10,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '200px',
    maxHeight: '80vh', // Prevents overflowing screen
    overflowY: 'auto', // Scroll inside menu only if too many items
    zIndex: 1001,
  }, 
  position: 'fixed' as 'fixed',
  top: 60,
  left: '5%',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '6px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  width: '90%',
  maxWidth: '300px',
  maxHeight: '70vh',
  overflowY: 'auto',
  zIndex: 1001,
},
  
  item: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    fontSize: '14px', 
  } 
  },  
};

export default CategoryMenuButton;
