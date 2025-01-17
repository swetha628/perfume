// src/pages/CheckoutPage.js
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const stripePromise = loadStripe('pk_test_51QUQ53Ep67J1jInyHXkyb9VliPuDAR5xGuB3S0WO5cXRI0SpV0hy4MM1Sg615l7trkUniec2oll2Xf8yJVnHy5CY00NHy45FNs');

  useEffect(() => {
    // Fetch the client secret from the backend
    fetch('/api/payment/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cartItems: [{ name: 'Item', price: 2000, quantity: 1 }] }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            console.error('Failed to create session. Status:', response.status, text);
            return Promise.reject('Failed to create session');
          });
        }
        return response.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment form...</p>
      )}
    </div>
  );
};

export default CheckoutPage;
