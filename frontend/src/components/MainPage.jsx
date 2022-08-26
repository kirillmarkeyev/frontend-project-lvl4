import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import { useAuth } from '../hooks/index.js';
import routes from '../routes.js';
import getModal from './modals/index.js';

import { getModalType } from '../slices/selectors.js';

import { actions as channelsActions } from '../slices/channelsSlice.js';
import { actions as messagesActions } from '../slices/messagesSlice.js';

const MainPage = () => {
  // состояние показа спиннера во время загрузки
  const [isSpinnerShown, setIsSpinnerShown] = useState(true);

  const auth = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalType = useSelector(getModalType);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.dataPath(), { headers: auth.getAuthHeader() });

      const { channels, currentChannelId, messages } = response.data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));

      setIsSpinnerShown(false);
    };
    fetchData();
  // eslint-disable-next-line
  }, []);

  const renderModal = (type) => {
    if (!type) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal />;
  };

  return isSpinnerShown
    ? (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">{t('loading')}</span>
        </Spinner>
      </div>
    )
    : (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
        {renderModal(modalType)}
      </Container>
    );
};

export default MainPage;
