import 'bootstrap/dist/css/bootstrap.css';

import clsx from 'clsx';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { ErrorMessage } from '@hookform/error-message';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';
import { useState } from 'react';
import registerAuth from '~/api/auth/register';
import styles from './register.module.css';

const schema = yup

  .object()

  .shape({
    username: yup.string().required(),

    password: yup

      .string()

      .required('Please Enter your password')

      .matches(
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        /^(?=.{8,})/,

        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),

    email: yup.string().email().required(),

    retypePassword: yup.string().oneOf([yup.ref('password'), null]),

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

  const [registerErr, setRegisterErr] = useState('');
  const onSubmit = async (data) => {
    try {
      await registerAuth({
        username: data.username,
        password: data.password,
        displayName: data.displayName,
        email: data.email,
      });
    } catch (error) {
      setRegisterErr(error.response?.data?.message);
    }
  };

  return (
    <div className={clsx(styles.container)}>
      {' '}
      <Form
        // animate={{ x: 0, scale: 1 }}
        // transition={{ duration: 0.5 }}
        // initial={{ x: -100, scale: 0 }}
        onSubmit={handleSubmit(onSubmit)}
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

          // controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>

          <Form.Control
            {...register('password')}
            type="password"
            placeholder="Password"
          />

          <Form.Text className="text-muted">
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <p className={clsx(styles.error)}>{message}</p>
              )}
            />
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

          <Form.Text className="text-muted">
            <ErrorMessage
              errors={errors}
              name="retypePassword"
              render={({ message }) => (
                <p className={clsx(styles.error)}>{message}</p>
              )}
            />
          </Form.Text>
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

          <Form.Text className="text-muted">
            <ErrorMessage
              errors={errors}
              name="displayName"
              render={({ message }) => (
                <p className={clsx(styles.error)}>{message}</p>
              )}
            />
          </Form.Text>
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

          <Form.Text className="text-muted">
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <p className={clsx(styles.error)}>{message}</p>
              )}
            />
          </Form.Text>

          <Form.Text className="text-muted">
            <p className={clsx(styles.error)}>{registerErr}</p>
          </Form.Text>
        </Form.Group>

        <Button
          className={clsx(styles.login_btn)}
          variant="outline-info"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;
