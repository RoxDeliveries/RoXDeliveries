// src/data/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ItemType = { id: string; name: string };
type CartItem = ItemType & { quantity: number };

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: ItemType) => void;
  removeFromCart: (item: ItemType) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside a CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: ItemType) => {
    setCart((c) => {
      const found = c.find((x) => x.id === item.id);
      if (found) {
        return c.map((x) =>
          x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...c, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: ItemType) => {
    setCart((c) => {
      const found = c.find((x) => x.id === item.id);
      if (!found) return c;
      if (found.quantity === 1) return c.filter((x) => x.id !== item.id);
      return c.map((x) =>
        x.id === item.id ? { ...x, quantity: x.quantity - 1 } : x
      );
    });
  };

  const clearCart = () => setCart([]);
  const getTotalItems = () => cart.reduce((sum, x) => sum + x.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((sum, x) => sum + x.quantity , 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};
