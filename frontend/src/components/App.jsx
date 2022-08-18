import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';

const PrivateOutlet = ({ toMainPage } = false) => {
  const auth = useAuth();

  if (toMainPage) {
    return auth.user ? <Outlet /> : <Navigate to="/login" />;
  }
  return auth.user ? <Navigate to="/" /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route path="/" element={<PrivateOutlet toMainPage />}>
            <Route path="" element={<MainPage />} />
          </Route>
          <Route path="/login" element={<PrivateOutlet />}>
            <Route path="" element={<LoginPage />} />
          </Route>
          <Route path="/signup" element={<PrivateOutlet />}>
            <Route path="" element={<RegistrationPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
