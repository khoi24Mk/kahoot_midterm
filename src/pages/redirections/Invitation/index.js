import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import joinGroup from '~/api/normal/joinGroup';
import Error from '~/components/Error';
import Loading from '~/components/Loading';

export default function Invitation() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [error, setError] = useState(code == null ? 'Code is not found' : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncJoinGroup = async () => {
      setLoading(true);
      try {
        await joinGroup(code);
      } catch (err) {
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    asyncJoinGroup();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return error == null ? (
    <Navigate to="/group" />
  ) : (
    <Error
      error={error}
      title="Invitation error !!!"
      resolveElement={
        <Link to="/home">
          <Button variant="primary">Go Home</Button>
        </Link>
      }
    />
  );
}
