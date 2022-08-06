import React from 'react';
import { Provider as StoreProvider } from 'react-redux';

import store from './slices/index.js';
import App from './components/App.jsx';

const init = () => {
  const vdom = (
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  );

  return vdom;
};

export default init;
