/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/order */

import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ErrorMessage } from '@hookform/error-message';
import styles from './register.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required('Please Enter your password'),
    email: yup.string().email().required('Error'),
    // retypePassword: yup.string().oneOf([yup.ref('password'), null]),
    displayName: yup.string().required(),
  })
  .required();

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className={clsx(styles.container)}>
      {' '}
      <Form
        onSubmit={handleSubmit(submitForm)}
        className={clsx(styles.content)}
      >
        <h1>Register</h1>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          // controlId="formBasicEmail"
        >
          <Form.Label>Username</Form.Label>
          <Form.Control
            {...register('username')}
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
          <Form.Control
            {...register('password')}
            type="password"
            placeholder="Password"
          />
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
          // controlId="formBasicPassword"
        >
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            {...register('retypePassword')}
            type="password"
            placeholder="retype password"
          />
        </Form.Group>

        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicName"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            {...register('displayName')}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group
          className={clsx(styles.group, 'mb-3')}
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>
          <Form.Control
            {...register('email')}
            type="email"
            placeholder="Enter email"
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <p>{message}</p>}
          />
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
