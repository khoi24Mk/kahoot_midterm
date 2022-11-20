/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styles from './register.module.css';

function Register() {
  return (
    <div className={clsx(styles.container)}>
      {' '}
      <Form className={clsx(styles.content)}>
        <h1>Register</h1>
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
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
          <Form.Text
            className={clsx(styles.pass_helper)}
            id="passwordHelpBlock"
            muted
          >
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicPassword"
        >
          <Form.Label>Retype Password</Form.Label>
          <Form.Control type="password" placeholder="retype password" />
        </Form.Group>

        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicName"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <p>Or register with Google</p>
        <div className={clsx(styles.alt_login)}>
          <div className={clsx(styles.google_login)}></div>
        </div>
        <p>Already have account? Login now</p>
      </Form>
    </div>
  );
}

export default Register;
