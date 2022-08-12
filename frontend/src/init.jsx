/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';

import store from './slices/index.js';
import App from './components/App.jsx';
import { SocketContext } from './contexts/index.js';

import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice';

import resources from './locales/index.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel, (response) => {
    if (response.status === 'ok') {
      const { id } = response.data;
      dispatch(channelsActions.setCurrentChannelId(id));
    } else {
      console.log(response.status);
    }
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id }, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.removeChannel(payload));
    if (payload.id === currentChannelId) {
      dispatch(channelsActions.setCurrentChannelId(1));
    } else {
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
    }
  });

  const renameChannel = (renamedChannel) => socket.emit('renameChannel', renamedChannel, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    dispatch(channelsActions.changeChannelName({
      id,
      changes: {
        name,
      },
    }));
  });

  return (
    <SocketContext.Provider value={{
      addNewMessage,
      addNewChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

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
