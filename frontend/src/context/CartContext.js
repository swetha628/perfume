import React, { createContext, useState, useEffect, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// CartContext Provider
export const CartProvider = ({ children }) => {
  // Initialize cart state
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart'); // Remove from storage if the cart is empty
    }
  }, [cart]);

  // Function to clear the cart (for logout)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart'); // Remove from localStorage
  };

  return (
    <CartContext.Provider value={{ cart, setCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access CartContext
export const useCart = () => {
  return useContext(CartContext);
};
