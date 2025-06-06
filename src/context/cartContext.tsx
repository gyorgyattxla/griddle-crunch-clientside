import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CartItem, Product } from './cartTypes';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  getFinalAmount: () => number;
  setCartFromStorage: (cart: CartItem[]) => void;
  clearCart: () => void;
}

// Létrehozod a Context-et:
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev =>
      prev
        .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const getFinalAmount = (): number => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

const setCartFromStorage = useCallback((storedCart: CartItem[]) => {
    setCart(storedCart);
  }, []);

  const clearCart = () => {
  setCart([]);
  localStorage.removeItem('cart');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getFinalAmount, setCartFromStorage, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
