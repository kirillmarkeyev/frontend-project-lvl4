import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';


import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import AuthContext from '../contexts/index.js';
import useAuth from '../hooks/index.js';

// https://ru.hexlet.io/challenges/js_react_auth_exercise

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
    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }
    return {};
  };

  return (
    <AuthContext.Provider value ={{ user, logIn, logOut, getAuthHeader }}>
      {children}
    </AuthContext.Provider>
  );
};

const MainPageRoute = () => {
  const auth = useAuth();

  return (
    auth.user ? <MainPage /> : <Navigate to="/login" />
  );
};

const App = () => {
  
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPageRoute />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  </AuthProvider>
  );
};

export default App;
