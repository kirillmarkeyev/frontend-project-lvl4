import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './Header.jsx';
import LoginPage from './LoginPage.jsx';
import RegistrationPage from './RegistrationPage.jsx';
import MainPage from './MainPage.jsx';
import NotFoundPage from './NotFoundPage.jsx';

import AuthProvider from '../contexts/AuthProvider.jsx';
import { useAuth } from '../hooks/index.js';

const MainPageRoute = ({ children }) => {
  const auth = useAuth();

  return (
    auth.user ? children : <Navigate to="/login" />
  );
};

const LoginSignupPageRoute = ({ children }) => {
  const auth = useAuth();

  return (
    !auth.user ? children : <Navigate to="/" />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={(
              <MainPageRoute>
                <MainPage />
              </MainPageRoute>
            )}
          />
          <Route
            path="/login"
            element={(
              <LoginSignupPageRoute>
                <LoginPage />
              </LoginSignupPageRoute>
            )}
          />
          <Route
            path="/signup"
            element={(
              <LoginSignupPageRoute>
                <RegistrationPage />
              </LoginSignupPageRoute>
            )}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <ToastContainer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
