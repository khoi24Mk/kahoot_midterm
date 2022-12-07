import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import login from '~/api/auth/login';
import useGoogleLogin from '~/hooks/useGoogleLogin';
import styles from './login.module.css';
import { AuthContext } from '~/Context';
import Loading from '~/components/Loading';
import Notify from '~/components/Notification';

const schema = yup
  .object()
  .shape({
    username: yup.string().required(),
    password: yup.string().required('Please Enter your password'),
  })
  .required();

function Login() {
  const context = useContext(AuthContext);
  const { setProfile } = context;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loadingLogin, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    show: false,
    msg: '',
    type: '',
  });

  const { state } = useLocation();
  const redirectUrl = state?.redirectUrl || '/home';
  const search = state?.search || '';

  const navigate = useNavigate();

  const handleSuccessLogin = (loginRet) => {
    if (
      loginRet?.access_token &&
      loginRet?.refresh_token &&
      loginRet?.profile
    ) {
      localStorage.setItem('access_token', loginRet.access_token);
      localStorage.setItem('refresh_token', loginRet.refresh_token);
      setProfile(loginRet.profile);
      navigate({ pathname: redirectUrl, search }, { replace: true });
    } else {
      setNotify({ msg: 'Token is not found', type: 'warning', show: true });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await login({
        username: data.username,
        password: data.password,
      });
      const loginRet = response?.data?.object;
      handleSuccessLogin(loginRet);
    } catch (error) {
      setNotify({
        msg: error?.response?.data?.message,
        type: 'warning',
        show: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const { handleGoogle, error, loading } = useGoogleLogin((loginRet) => {
    handleSuccessLogin(loginRet);
  }, setNotify);

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
          scope: 'profile email',
          width: 300,
          height: 80,
          longtitle: true,
          theme: 'dark',
        }
      );
    }
  }, [handleGoogle]);

  return (
    <>
      <Notify notify={notify} setShow={setNotify} />
      {loading || loadingLogin ? (
        <Loading />
      ) : (
        <div className={clsx(styles.container)}>
          <Form
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
                <p className={clsx(styles.error)}>{error}</p>
              </Form.Text>
            </Form.Group>
            {/* <Button
              className={clsx(styles.signup_btn)}
              variant="outline-info"
              type="submit"
            >
              {' '}
              Log In{' '}
            </Button>{' '} */}
            <Button type="submit" variant="dark" className="mb-3 v-75">
              Submit
            </Button>
            <b style={{ fontSize: '1rem' }} className="mb-3">
              Or login with Google
            </b>{' '}
            <div className={clsx(styles.alt_login)}>
              <div id="btnLoginGoogle" />
            </div>
            <p className={clsx(styles.signup_opt)}>
              {' '}
              Not a member? <Link to="/register">Sign up now</Link>{' '}
            </p>{' '}
          </Form>{' '}
        </div>
      )}
    </>
  );
}

export default Login;
