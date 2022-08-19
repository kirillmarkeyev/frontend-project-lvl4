/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';

import { SocketContext } from './index.js';

const SocketProvider = ({ socket, children }) => {
  const {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  } = socket;

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

export default SocketProvider;
