import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import joinPresentation from '~/api/normal/presentation/joinPresentation';
import Error from '~/components/Error';
import Loading from '~/components/Loading';

export default function CollaborationInvitation() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const [error, setError] = useState(code == null ? 'Code is not found' : null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncJoinPresentation = async () => {
      setLoading(true);
      try {
        await joinPresentation(code);
      } catch (err) {
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    asyncJoinPresentation();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return error == null ? (
    <Navigate to="/group" />
  ) : (
    <Error
      error={error}
      title="Collaboration Invitation error !!!"
      resolveElement={
        <Link to="/home">
          <Button variant="primary">Go Home</Button>
        </Link>
      }
    />
  );
}
