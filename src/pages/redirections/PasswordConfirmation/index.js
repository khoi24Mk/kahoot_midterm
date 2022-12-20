import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import confirmPassword from '~/api/auth/confirmPassword';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';

export default function PasswordConfirmation() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { setProfile } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    const asyncConfirmPassword = async () => {
      try {
        const response = await confirmPassword(searchParams.get('code'));
        setProfile(response?.data?.object?.profile);
        localStorage.setItem(
          'access_token',
          response?.data?.object?.access_token
        );
        localStorage.setItem(
          'refresh_token',
          response?.data?.object?.refresh_token
        );
      } catch (err) {
        setError(err?.response?.data?.message);
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
      } finally {
        setLoading(false);
      }
    };
    asyncConfirmPassword();
  }, []);
  if (error) {
    return (
      <Error
        title="Password confirmation error"
        error={error}
        resolveElement={
          <Button as={Link} to="/home">
            Go home
          </Button>
        }
      />
    );
  }
  return loading ? <Loading /> : <Navigate to="/home" />;
}
