/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuth0 } from '@auth0/auth0-react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './login.module.css';

function Login() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className={clsx(styles.container)}>
      {' '}
      <motion.Form
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ x: -100, scale: 0 }}
        className={clsx(styles.content)}
      >
        <h1>Login</h1>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicEmail"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </Form.Group>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicPassword"
        >
          {' '}
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />{' '}
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" /> </Form.Group> */}
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
          {' '}
          {!isAuthenticated && (
            <div
              onClick={() => loginWithRedirect()}
              className={clsx(styles.google_login)}
            ></div>
          )}{' '}
        </div>{' '}
        <p className={clsx(styles.signup_opt)}>
          {' '}
          Not a member? <a href="/register">Sign up now</a>{' '}
        </p>{' '}
      </motion.Form>{' '}
    </div>
  );
}

export default Login;
