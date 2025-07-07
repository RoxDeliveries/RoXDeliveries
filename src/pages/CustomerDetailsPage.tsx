import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const handleProceed = () => {
    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    // Pass customer details to the checkout page
    navigate('/checkout', {
      state: {
        customerDetails: {
          name,
          phone,
          notes,
        },
      },
    });
  };

  return (
    <div style={styles.container}>
      <h2>🧍 Customer Details</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Any notes (optional)"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        style={styles.textarea}
      />
      <button onClick={handleProceed} style={styles.button}>
        Proceed to Checkout 🛒
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 420,
    margin: '40px auto',
    padding: 25,
    background: '#f9f9f9',
    borderRadius: 16,
    fontFamily: 'Segoe UI, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    marginBottom: 20,
    borderRadius: 8,
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: 14,
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    fontSize: 18,
    cursor: 'pointer',
  },
};

export default CustomerDetailsPage;
