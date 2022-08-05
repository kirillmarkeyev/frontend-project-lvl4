import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';
import getModal from './modals/index.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const MainPage = () => {
  const [modalType, setModalType] = useState(null);
  const auth = useAuth();
  const dispatch = useDispatch();

  const showModal = (type) => setModalType(type);
  const hideModal = () => setModalType(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });

      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, []);

  const renderModal = (type, hide) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal onHide={hide} />;
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels showModal={showModal} />
        <Messages />
      </Row>
      {renderModal(modalType, hideModal)}
    </Container>
  );
};

export default MainPage;
