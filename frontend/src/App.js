import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './components/Product';
import NavigationBar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './pages/CartPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import { CartProvider } from './context/CartContext'; // Correct path to CartContext

// ProtectedRoute component should be defined above the usage in App
const ProtectedRoute = ({ element, role }) => {
  const { user } = useAuth(); // Access user data from context

  // Check if the user is logged in
  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role
  if (user.role !== role) {
    // If user doesn't have the correct role, redirect to home page
    return <Navigate to="/" />;
  }

  // If user is logged in and has correct role, show the protected element
  return element;
};

function App() {
  const [cart, setCart] = useState([]); // Cart state to store cart items

  const addToCart = (product, size) => {
    setCart([...cart, { ...product, size }]); // Add product to cart
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NavigationBar cart={cart} /> {/* Pass cart to NavigationBar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductPage addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute role="admin" element={<AdminDashboard />} />}
            />
            <Route
              path="/user/dashboard"
              element={<ProtectedRoute role="user" element={<UserDashboard />} />}
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
