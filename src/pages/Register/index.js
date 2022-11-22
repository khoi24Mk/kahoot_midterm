/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-useless-escape */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { ErrorMessage } from '@hookform/error-message';
import styles from './register.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup
      .string()
      .required('Please Enter your password')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
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

  const onSubmit = (data) => {
    console.log(schema);
    console.log('sth');
    // console.log(e);
  };
  // console.log(schema);
  // onSubmit();
  return (
    <div className={clsx(styles.container)}>
      {' '}
      <motion.Form
        animate={{ x: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        initial={{ x: -100, scale: 0 }}
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
        </Form.Group>
        <Button
          className={clsx(styles.login_btn)}
          variant="outline-info"
          type="submit"
        >
          Login
        </Button>
        <p className={clsx(styles.google_opt)}>Or register with Google</p>
        <div className={clsx(styles.alt_login)}>
          <div className={clsx(styles.google_login)}></div>
        </div>
        <p className={clsx(styles.login_opt)}>
          Already have account? <a href="/login">Login now</a>
        </p>
      </motion.Form>
    </div>
  );
}

export default Register;
