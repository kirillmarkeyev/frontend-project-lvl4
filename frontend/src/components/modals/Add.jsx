import React, { useEffect, useRef } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';

import { useSelector } from 'react-redux';

import { useSocket } from '../../hooks/index.js';
import { selectors as channelsSelectors } from '../../slices/channelsSlice.js';

const Add = (props) => {
  const { onHide } = props;
  const inputEl = useRef();
  const chat = useSocket();

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  const channels = useSelector(channelsSelectors.selectAll);

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channels.map((channel) => channel.name), 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      chat.addNewChannel(values);
      onHide();
    },
  });

  return (
    <Modal show centered>
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
            isInvalid={formik.errors.name && formik.touched.name}
          />
          <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
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
