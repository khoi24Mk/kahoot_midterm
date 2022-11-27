import { Button } from 'react-bootstrap';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import Error from '~/components/Error';

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
    <Error
      error={error}
      title="Verification error !!!"
      resolveElement={
        <Link to="/register">
          <Button variant="primary">Register again</Button>
        </Link>
      }
    />
  ) : (
    <Navigate to="/home" />
  );
}
