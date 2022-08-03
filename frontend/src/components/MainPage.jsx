import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });

      console.log(response.data);
      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };
    fetchData();
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
    </Container>
  );
};

export default MainPage;
