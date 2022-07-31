import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';

import useAuth from '../hooks/index.js';
import routes from '../routes.js';

import avatar from '../assets/avatar.jpg';

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
  const auth = useAuth();
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
      setAuthFailed(false);
      try {
        const response = await axios.post(routes.loginPath(), values);
        auth.logIn(response.data);
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
    <div className="container-fluid h-100 mt-5">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatar}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
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
                <Form.Group className="form-floating mb-4">
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
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
              </Form>
            </div>
          </div>  
        </div> 
      </div>
    </div> 
  );
};

export default LoginPage;
