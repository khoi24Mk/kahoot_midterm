import 'bootstrap/dist/css/bootstrap.css';

import clsx from 'clsx';

import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';

import { ErrorMessage } from '@hookform/error-message';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';

import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import renewPassword from '~/api/auth/renewPassword';
import Loading from '~/components/Loading';
import styles from './register.module.css';
import { AuthContext } from '~/Context';

const schema = yup

  .object()

  .shape({
    username: yup
      .string()
      .min(8, 'Your username must be longer than 8 characters')
      .max(32, 'Your username must be shorter than 32 characters')
      .required(),

    email: yup.string().email().required(),
    password: yup

      .string()
      .min(8, 'Your password must be longer than 8 characters')
      .max(32, 'Your password must be shorter than 32 characters')

      .required('Please Enter your password')

      .matches(
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        /^(?=.{8,})/,

        'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
      ),

    retypePassword: yup.string().oneOf([yup.ref('password'), null]),
  })

  .required();

function RenewPassword() {
  const { profile } = useContext(AuthContext);
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await renewPassword({
        username: data.username,
        password: data.password,
        email: data.email,
      });
      toast.success(`Check your confirmation in email ${data?.email}`);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      if (err?.response?.status === 403) {
        navigate({ pathname: '/notPermission' });
      }
    } finally {
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return loading ? (
    <Loading />
  ) : (
    <div className={clsx(styles.container)}>
      {' '}
      <Form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.content)}>
        <h1>Renew password</h1>

        <Form.Group className={clsx(styles.group, 'mb-3')}>
          <Form.Label>Username</Form.Label>

          <Form.Control
            {...register('username')}
            defaultValue={profile?.username}
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
          controlId="formBasicEmail"
        >
          <Form.Label>Email address</Form.Label>

          <Form.Control
            defaultValue={profile?.email}
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
  );
}

export default RenewPassword;
