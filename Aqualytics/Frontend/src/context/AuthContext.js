import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // MOCKED AUTHENTICATION
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const dummyUser = {
    id: '507f1f77bcf86cd799439011',
    email: 'bypass@example.com',
    role: 'admin'
  };
  const dummyToken = 'dummy_token_bypass';

  const [user, setUser] = useState(dummyUser);
  const [token, setToken] = useState(dummyToken);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Always enforce logged-in state
    localStorage.setItem('token', dummyToken);
    localStorage.setItem('user', JSON.stringify(dummyUser));
    setToken(dummyToken);
    setUser(dummyUser);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    // Prevent logout in bypass mode
    console.log('Logout disabled in bypass mode');
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: true, // Always true
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};