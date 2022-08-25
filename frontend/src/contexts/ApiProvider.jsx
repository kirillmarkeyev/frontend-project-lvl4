/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';

import { ApiContext } from './index.js';

const ApiProvider = ({ mainAPI, children }) => {
  const {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  } = mainAPI;

  return (
    <ApiContext.Provider value={{
      addNewMessage,
      addNewChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
