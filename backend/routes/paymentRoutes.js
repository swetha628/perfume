require('dotenv').config();
const express = require('express');
const router = express.Router();
const stripe = require('stripe')("sk_test_51QUQ53Ep67J1jInyusCP5bmGHT5Yqj8GaGfmsaB5LTJNOPNdmIyNdUcvwL21qPaRxcMSrtjCMbzGXktetmHFhE1l00wvC9i1zH"); // Use the Stripe secret key from the .env file

// POST route to create checkout session
router.post('/create-checkout-session', async (req, res) => {
    try {
      const cartItems = req.body.cartItems;
      console.log('Received cartItems:', cartItems); // Log the request body
  
      const lineItems = cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price * 100, // Amount in cents
        },
        quantity: item.quantity,
      }));
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
  
      console.log('Created checkout session:', session); // Log the session ID
      res.json({ id: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error); // Log error details
      res.status(500).json({ error: 'Something went wrong!' });
    }
  });
  
module.exports = router;
