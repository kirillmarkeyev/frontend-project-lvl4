/* eslint-disable react/jsx-no-constructed-context-values */

import React, { useState } from 'react';

import { AuthContext } from './index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);

  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const logOut = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const getAuthHeader = () => {
    if (currentUser && currentUser.token) {
      return { Authorization: `Bearer ${currentUser.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value={{
      user,
      logIn,
      logOut,
      getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
