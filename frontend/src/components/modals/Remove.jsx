import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { useSocket } from '../../hooks/index.js';

const Remove = (props) => {
  const { onHide, id } = props;

  const chat = useSocket();

  const handleRemove = (channelId) => {
    chat.removeChannel(channelId);
    onHide();
  };

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
          <Button type="submit" variant="danger" onClick={() => handleRemove(id)}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
