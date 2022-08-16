import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import leoProfanity from 'leo-profanity';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import store from './slices/index.js';
import App from './components/App.jsx';
import SocketProvider from './contexts/SocketProvider.jsx';

import resources from './locales/index.js';

const rollbarConfig = {
  accessToken: '9eedeb0568154ea086db04e66f8d26e3',
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = async (socket) => {
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
          <SocketProvider socket={socket}>
            <I18nextProvider i18n={i18n}>
              <App />
            </I18nextProvider>
          </SocketProvider>
        </StoreProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};

export default init;
