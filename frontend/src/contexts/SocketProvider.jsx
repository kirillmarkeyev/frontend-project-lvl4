/* eslint-disable react/jsx-no-constructed-context-values */

import React from 'react';
import { useDispatch } from 'react-redux';

import { SocketContext } from './index.js';

import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

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
    dispatch(channelsActions.setDefaultChannelId(payload.id));
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

export default SocketProvider;
