import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

const Add = (props) => {
  const { onHide } = props;
  const inputEl = useRef();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            className="mb-2"
            onChange={formik.handleChange}
            ref={inputEl}
            id="name"
            name="name"
            value={formik.values.name}
          />
            <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>

          <div className="d-flex justify-content-end">
            <Button className="me-2" variant="secondary" onClick={onHide}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
