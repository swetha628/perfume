require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51QUQ53Ep67J1jInyusCP5bmGHT5Yqj8GaGfmsaB5LTJNOPNdmIyNdUcvwL21qPaRxcMSrtjCMbzGXktetmHFhE1l00wvC9i1zH');
const paymentRoutes = require('./routes/paymentRoutes'); 
const productRoutes = require('./routes/products');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // React frontend address
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(express.json());

// Use payment routes
app.use('/api/payment', paymentRoutes);
app.use('/api/products', productRoutes);

// Add CSP header middleware
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", 
    "default-src 'self'; style-src 'self' https://js.stripe.com 'sha256-0wCsuxti3m6dSdXFrCFETD2dpAVJPkB2rNReo7a96ME=' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;");
  next();
});

app.get('/', (req, res) => {
  res.send('Perfume Shop API');
});
app.post('/api/payment/create-checkout-session', async (req, res) => {
  try {
    const cartItems = [
      { name: 'Perfume A', price: 2999, quantity: 1 },
      { name: 'Perfume B', price: 4999, quantity: 2 },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cartItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: { name: item.name },
          unit_amount: item.price, // Price in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error);
    res.status(500).json({ error: 'Something went wrong!', details: error.message });
  }
});



const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/perfume-store';

mongoose.connect(DB_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
