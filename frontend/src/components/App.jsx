import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const App = () => {
  const hasToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return true;
    } return false;
  };
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={hasToken() ? <MainPage /> : <LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
  );
};

export default App;
