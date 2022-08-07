import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Remove = (props) => {
  const { onHide, id } = props;
  console.log(id);

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
          <Button type="submit" variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
