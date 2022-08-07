import React, { useRef, useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import { Form, InputGroup, Button } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import { useAuth, useSocket } from '../hooks/index.js';

import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { selectors as messagesSelectors } from '../slices/messagesSlice.js';

const Messages = () => {
  const inputRef = useRef();
  const lastMessageRef = useRef();
  const auth = useAuth();
  const chat = useSocket();

  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const currentChannel = useSelector((state) => channelsSelectors
    .selectById(state, currentChannelId));

  const messages = useSelector(messagesSelectors.selectAll);
  const currentMessages = messages.filter((m) => m.channelId === currentChannelId);

  useEffect(() => {
    inputRef.current.focus();
  });

  useEffect(() => {
    lastMessageRef.current.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentMessages]);

  const validationSchema = yup.object().shape({
    body: yup
      .string()
      .trim()
      .required(),
  });

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (values.body !== '') {
        const { body } = values;
        const channelId = currentChannelId;
        const { username } = auth.user;
        const data = {
          body,
          channelId,
          username,
        };
        chat.addNewMessage(data);
        formik.resetForm();
      }
    },
  });

  const messagesRender = () => {
    if (currentMessages.length === 0) {
      return null;
    }
    return (
      currentMessages.map((m) => (
        <div key={m.id} className="text-break mb-2">
          <b>{m.username}</b>: {m.body}
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
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <InputGroup>
              <Form.Control
                onChange={formik.handleChange}
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
                value={formik.values.body}
                ref={inputRef}
                disabled={formik.isSubmitting}
              />
              <Button
                type="submit"
                variant="link"
                className="btn-group-vertical"
                disabled={formik.errors.body || !formik.values.body}
              >
                <ArrowRightSquare />
                <span className="visually-hidden">Отправить</span>
              </Button>
            </InputGroup>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Messages;
