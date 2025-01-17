//import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  // Handle removing an item from the cart
  const handleRemove = (id, size) => {
    const updatedCart = cart.filter(item => !(item.id === id && item.size === size));
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Handle updating quantity
  const handleQuantityChange = (id, size, quantity) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.size === size
        ? { ...item, quantity }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const itemPrice = isNaN(item.price) ? 20 : item.price; // Default to $20 if price is NaN
      return total + itemPrice * item.quantity;
    }, 0);
  };

  // Handle checkout action
  const handleCheckout = async () => {
    try {
      // Make a POST request to create the checkout session
      const response = await axios.post('http://localhost:5000/api/payment/create-checkout-session', {
        cartItems: cart
      });
  
      // Get the session ID from the response
      const sessionId = response.data.id;
  
      // Redirect the user to the Stripe checkout page
      const stripe = window.Stripe('pk_test_51QUQ53Ep67J1jInyHXkyb9VliPuDAR5xGuB3S0WO5cXRI0SpV0hy4MM1Sg615l7trkUniec2oll2Xf8yJVnHy5CY00NHy45FNs'); // Add your Stripe publishable key
      stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
  
      // Log more error details
     
    }
  };
  

  return (
    <div className="cart-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={`${item.id}-${item.size}`}>
              <td><img src={item.image} alt={item.name} style={{ width: '50px' }} /></td>
              <td>{item.name}</td>
              <td>{item.size}</td>
              <td>${(isNaN(item.price) ? 20 : item.price).toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, item.size, parseInt(e.target.value))}
                />
              </td>
              <td>${(isNaN(item.price) ? 20 : item.price * item.quantity).toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleRemove(item.id, item.size)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Display Total */}
      <div className="cart-summary">
        <h4>Total: ${calculateTotal().toFixed(2)}</h4>
        <Button variant="success" className="proceed-btn" onClick={handleCheckout}>
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
