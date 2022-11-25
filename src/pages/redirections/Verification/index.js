import { Button, Card, Container } from 'react-bootstrap';
import { Link, Navigate, useSearchParams } from 'react-router-dom';

export default function Verification() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  if (accessToken && refreshToken) {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', accessToken);
  }

  return error ? (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="w-75">
        <Card.Body>
          <Card.Title>
            <h3 className="fw-bold text-uppercase">Verification error !!!</h3>
          </Card.Title>
          <Card.Text>
            <p className="text-secondary">{error}</p>
          </Card.Text>
          <Link to="/">
            <Button variant="primary">Go Home</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  ) : (
    <Navigate to="/" />
  );
}
