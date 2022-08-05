import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

import { ArrowRightSquare } from 'react-bootstrap-icons';

import useAuth from '../hooks/index.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const Messages = () => {
  const [message, setMessage] = useState('');
  const inputRef = useRef();
  const lastMessageRef = useRef();
  const auth = useAuth();
  const dispatch = useDispatch();

  const socket = io();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));

  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter((message) => message.channelId === currentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentMessages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const body = message;
      const channelId = currentChannelId;
      const { username } = auth.user;
      const data = {
        body,
        channelId,
        username,
      };
      socket.emit('newMessage', data, (response) => {
        console.log(response.status);
      });
      // https://socket.io/docs/v4/emitting-events/#acknowledgements

      setMessage('');

      socket.on('newMessage', (payload) => {
        dispatch(messagesActions.addMessage(payload));
      }); 
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const messagesRender = () => {
    if (currentMessages.length === 0) {
      return null;
    }
    return (
      currentMessages.map((message) => (
        <div key={message.id} className="text-break mb-2">
          <b>{message.username}</b>: {message.body}
        </div>
      ))
    );
  };
  
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannel?.name}</b></p>
          <span className="text-muted">{currentMessages.length} сообщений</span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {messagesRender()}
          <span ref={lastMessageRef}></span>
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleSubmit} noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                onChange={handleChange}
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value={message}
                ref={inputRef}
              />
              <button type="submit" className="btn btn-group-vertical" disabled="">
                <ArrowRightSquare />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
