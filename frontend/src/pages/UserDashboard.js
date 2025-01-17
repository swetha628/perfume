// pages/UserDashboard.js
import React from 'react';
import { useAuth } from '../context/AuthContext'; // Correct import of useAuth

const UserDashboard = () => {
  const { user, logout } = useAuth(); // Use useAuth hook to access user and logout

  if (user?.role !== 'user') {
    return <p>You are not authorized to view this page.</p>;
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Welcome, User!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserDashboard;
