import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { useSocket } from '../../hooks/index.js';

const Remove = (props) => {
  const { onHide, id } = props;

  const chat = useSocket();
  const { t } = useTranslation();

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modalRemove.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modalRemove.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>{t('modalRemove.cancel')}</Button>
          <Button type="submit" variant="danger" onClick={() => handleRemove(id)}>{t('modalRemove.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
