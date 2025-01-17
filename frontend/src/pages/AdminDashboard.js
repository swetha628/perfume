// pages/AdminDashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Correct import of useAuth

const AdminDashboard = () => {
  const { user, logout } = useAuth(); // Use useAuth hook to access user and logout

  if (user?.role !== 'admin') {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
