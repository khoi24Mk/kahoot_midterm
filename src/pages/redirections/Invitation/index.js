/* eslint-disable consistent-return */
/* eslint-disable no-throw-literal */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import joinGroup from '~/api/normal/joinGroup';
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
    <Navigate to="/profile" />
  ) : (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="w-75">
        <Card.Body>
          <Card.Title>
            <h3 className="fw-bold text-uppercase">Invitation error !!!</h3>
          </Card.Title>
          <Card.Text className="text-secondary">{error}</Card.Text>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}
