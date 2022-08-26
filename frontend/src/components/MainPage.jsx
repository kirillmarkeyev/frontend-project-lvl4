import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

import getModal from './modals/index.js';
import { isDataFetching, getModalType } from '../slices/selectors.js';
import { fetchData } from '../slices/channelsSlice.js';

const MainPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const modalType = useSelector(getModalType);
  const isSpinnerShown = useSelector(isDataFetching);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

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
