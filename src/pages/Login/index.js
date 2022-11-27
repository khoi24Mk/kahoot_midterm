/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import login from '~/api/auth/login';
import useGoogleLogin from '~/hooks/useGoogleLogin';
import styles from './login.module.css';

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required('Please Enter your password'),
  })
  .required();

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loginErr, setLoginErr] = useState('');
  const { state } = useLocation();

  const redirectUrl = state?.redirectUrl || '/home';

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });
      const token = response?.data?.object;

      if (token?.access_token && token?.refresh_token) {
        localStorage.setItem('access_token', token.access_token);
        localStorage.setItem('refresh_token', token.refresh_token);
        navigate(redirectUrl);
      } else {
        setLoginErr('Token is not found');
      }
    } catch (error) {
      setLoginErr(error?.response?.data?.message);
    }
  };

  const { handleGoogle, loading, error } = useGoogleLogin(() => {
    navigate(redirectUrl);
  });
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(
        document.getElementById('btnLoginGoogle'),
        {
          theme: 'filled_black',
          text: 'signin_with',
          shape: 'pill',
        }
      );
    }
  }, [handleGoogle]);
  return (
    <div className={clsx(styles.container)}>
      {' '}
      <motion.Form
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ x: -100, scale: 0 }}
        className={clsx(styles.content)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1>Login</h1>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicEmail"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register('username')}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
          <Form.Text className="text-muted">
            <ErrorMessage
              errors={errors}
              name="username"
              render={({ message }) => (
                <p className={clsx(styles.error)}>{message}</p>
              )}
            />
          </Form.Text>
        </Form.Group>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicPassword"
        >
          {' '}
          <Form.Label>Password</Form.Label>
          <Form.Control
            {...register('password')}
            type="password"
            placeholder="Password"
          />{' '}
          <Form.Text className="text-muted">
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className={clsx(styles.error)}>{message}</p>
              )}
            />
          </Form.Text>
          <Form.Text className="text-muted">
            <p className={clsx(styles.error)}>{loginErr}</p>
          </Form.Text>
          <Form.Text className="text-muted">
            <p className={clsx(styles.error)}>{error}</p>
          </Form.Text>
        </Form.Group>
        <Button
          className={clsx(styles.signup_btn)}
          variant="outline-info"
          type="submit"
        >
          {' '}
          Sign Up{' '}
        </Button>{' '}
        <p className={clsx(styles.google_opt)}>Or login with Google</p>{' '}
        <div className={clsx(styles.alt_login)}>
          <div id="btnLoginGoogle" />
        </div>
        <p className={clsx(styles.signup_opt)}>
          {' '}
          Not a member? <a href="/login">Sign up now</a>{' '}
        </p>{' '}
      </motion.Form>{' '}
    </div>
  );
}

export default Login;
