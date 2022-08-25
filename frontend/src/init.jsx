import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import leoProfanity from 'leo-profanity';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import store from './slices/index.js';
import App from './components/App.jsx';
import ApiProvider from './contexts/ApiProvider.jsx';

import createAPI from './api/createAPI.js';
import resources from './locales/index.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: process.env.NODE_ENV,
  },
};

const init = async (socket) => {
  const mainAPI = createAPI(socket);
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <StoreProvider store={store}>
          <ApiProvider mainAPI={mainAPI}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </ApiProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
