import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';  // Use 'useNavigate' here
import axios from 'axios';

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();  // Initialize 'useNavigate'
  const [message, setMessage] = useState('Verifying payment...');
  const sessionId = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    if (!sessionId) {
      setMessage('Session ID is missing or expired.');
      setTimeout(() => {
        // Redirect to the home or cart page after a delay
        navigate('/');  // Use 'navigate' to redirect
      }, 5000);
      return;
    }

    // Call your backend to confirm the payment
    axios.post('http://localhost:5000/api/payment/verify-session', { sessionId })
      .then(response => {
        if (response.data.success) {
          setMessage('Payment Successful!');
        } else {
          setMessage('Payment failed or was canceled.');
        }
      })
      .catch(error => {
        setMessage('Error verifying payment.');
        console.error('Error verifying payment:', error);
      });
  }, [sessionId, navigate]);  // Include 'navigate' in the dependency array

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default SuccessPage;
