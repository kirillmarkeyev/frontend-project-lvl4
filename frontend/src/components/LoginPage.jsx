import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

import routes from '../routes.js';

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .required('Required'),
  password: Yup
    .string()
    .required('Required'),
});

// https://ru.hexlet.io/challenges/js_react_auth_exercise

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setAuthFailed(false);
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        navigate('/');
      } catch (err) {
        setAuthFailed(true);
        inputRef.current.select();
        console.log(err);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.username}
          name="username"
          id="username"
          autoComplete="username"
          isInvalid={authFailed}
          required
          ref={inputRef}
          placeholder="username"
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Control
          onChange={formik.handleChange}
          value={formik.values.password}
          id="password"
          isInvalid={authFailed}
          placeholder="password"
          name="password"
          autoComplete="current-password"
          type="password"
          required
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid">
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary">Войти</Button>
    </Form>
  );
};

export default LoginPage;
