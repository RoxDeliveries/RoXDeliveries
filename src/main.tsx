// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CategoryItemsPage from './pages/CategoryItemsPage';
import CartPage from './pages/CartPage';
import CartSummaryPage from './pages/CartSummaryPage';
import { CartProvider } from './data/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmation from './pages/OrderConfirmation';
import CategoryMenuButton from './Components/CategoryMenu'
import './index.css';
import PlaceOrderPage from './pages/PlaceOrderPage'
import LoginPage from './pages/LoginPage'
import OtpVerificationPage from './pages/OtpVerificationPage';
import SetupPinPage from './pages/SetupPinPage';
import PinLoginPage from './pages/PinLoginPage';
import PrivateRoute from './pages/PrivateRoute';
import SearchResultsPage from './pages/SearchResultsPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/category/:categoryName" element={<CategoryItemsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart-summary" element={<CartSummaryPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/place-order" element={<PlaceOrderPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OtpVerificationPage />} />
          <Route path="/setup-pin" element={<SetupPinPage />} />
          <Route path="/pin-login" element={<PinLoginPage />} />
          <Route path="/search" element={<SearchResultsPage />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>
);