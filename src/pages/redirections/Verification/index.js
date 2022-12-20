import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import verifyAccount from '~/api/auth/verifyAccount';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';

export default function Verification() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const verificationId = searchParams.get('verificationId');
  const [error, setError] = useState(code == null ? 'Code is not found' : null);
  const [loading, setLoading] = useState(true);

  const context = useContext(AuthContext);
  const { setProfile } = context;

  const navigate = useNavigate();
  useEffect(() => {
    const asyncVerification = async () => {
      setLoading(true);
      try {
        const response = await verifyAccount({ verificationId, code });
        localStorage.setItem(
          'access_token',
          response?.data?.object.access_token
        );
        localStorage.setItem(
          'refresh_token',
          response?.data?.object.refresh_token
        );
        setProfile(response?.data?.object.profile);
      } catch (err) {
        setError(err?.response?.data?.message);
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
      } finally {
        setLoading(false);
      }
    };
    asyncVerification();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return error == null ? (
    <Navigate to="/group" />
  ) : (
    <Error
      error={error}
      title="Verification error !!!"
      resolveElement={
        <Link to="/home">
          <Button variant="primary">Go Home</Button>
        </Link>
      }
    />
  );
}
