// src/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { CartProvider, useCart } from './data/CartContext';

const categories = [
  'Fresh Fruits', 'Fresh Vegetables', 'Dairy Items', 'Groceries',
  'Snacks', 'Beverages', 'Stationery Items', 'Electronics',
  'Paan Items', 'Gift Items', 'Bakery', 'Frozen Foods',
  'Personal Care', 'Home Essentials', 'Pet Supplies', 'Medicines'
];

const Home: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-900 to-yellow-400 p-6">
    <h1 className="text-4xl font-bold text-white text-center mb-8">
      RoX Deliveries
    </h1>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {categories.map(cat => (
        <Link
          key={cat}
          to={`/category/${encodeURIComponent(cat)}`}
          className="bg-white/20 hover:bg-white/30 text-white border border-white rounded-xl p-6 shadow-lg text-center transition-transform transform hover:scale-105"
        >
          {cat}
        </Link>
      ))}
    </div>
  </div>
);

export default Home;
