import React, { createContext, useState, useContext } from 'react';

// Create a Context for user authentication
const UserContext = createContext();

// Provider component to manage user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user (logged out)

  // Log in user (store user data in context)
  const login = (userData) => {
    setUser(userData); // Set user data when logging in
  };

  // Log out user (clear user data)
  const logout = () => {
    setUser(null); // Set user to null when logging out
  };

  // Return provider with value containing user data, login, and logout functions
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => useContext(UserContext);
