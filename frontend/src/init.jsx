import React from 'react';
import { Provider as StoreProvider, useDispatch } from 'react-redux';

import store from './slices/index.js';
import App from './components/App.jsx';
import { SocketContext } from './contexts/index.js';

import { actions as messagesActions } from './slices/messagesSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const addNewMessage = (message) => socket.emit('newMessage', message, (response) => {
    if (response.status !== 'ok') {
      console.log(response.status);
    }
  });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
  });

  return (
    <SocketContext.Provider value={{
      addNewMessage,
    }}>
      {children}
    </SocketContext.Provider>
  );
};

const init = (socket) => {
  const vdom = (
    <StoreProvider store={store}>
      <SocketProvider socket={socket}>
        <App />
      </SocketProvider>
    </StoreProvider>
  );

  return vdom;
};

export default init;
