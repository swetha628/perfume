import React, { useState, useEffect } from 'react';
import Cart from '../components/cart';

function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Cart cart={cart} setCart={setCart} />
      )}
    </div>
  );
}

export default CartPage;
