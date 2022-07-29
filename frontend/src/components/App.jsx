import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      setToken(user.token);
    }
  });
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={token ? <MainPage /> : <LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
