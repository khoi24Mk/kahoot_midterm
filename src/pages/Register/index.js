import 'bootstrap/dist/css/bootstrap.css';

import clsx from 'clsx';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { ErrorMessage } from '@hookform/error-message';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import registerAuth from '~/api/auth/register';
import Loading from '~/components/Loading';
import Notify from '~/components/Notification';
import styles from './register.module.css';

const schema = yup

  .object()

  .shape({
    username: yup
      .string()
      .min(8, 'Your username must be longer than 8 characters')
      .max(32, 'Your username must be shorter than 32 characters')
      .required(),

    password: yup

      .string()

      .required('Please Enter your password')
      .min(8, 'Your password must be longer than 8 characters')
      .max(32, 'Your password must be shorter than 32 characters')

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
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    show: false,
    msg: '',
    type: '',
  });
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await registerAuth({
        username: data.username,
        password: data.password,
        displayName: data.displayName,
        email: data.email,
      });
      toast.success('Successfully. Check your email');
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Notify notify={notify} setShow={setNotify} />
      {loading ? (
        <Loading />
      ) : (
        <div className={clsx(styles.container)}>
          {' '}
          <Form
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

            <Form.Group className={clsx(styles.group, 'mb-3')}>
              <Form.Label>Password</Form.Label>

              <Form.Control
                {...register('password')}
                type={showPassword ? 'text' : 'password'}
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

            <Form.Group className={clsx(styles.group, 'mb-3')}>
              <Form.Label>Retype Password</Form.Label>

              <Form.Control
                {...register('retypePassword')}
                type={showPassword ? 'text' : 'password'}
                placeholder="retype password"
              />

              <Form.Check
                style={{ fontSize: '0.9rem' }}
                className="mt-3"
                type="checkbox"
                label="Show password"
                onChange={() => {
                  setShowPassword(!showPassword);
                }}
                checked={showPassword}
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
            </Form.Group>

            <Button type="submit" variant="dark" className="mb-3 v-75">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </>
  );
}

export default Register;
