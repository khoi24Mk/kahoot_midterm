import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Error from '~/components/Error';

export default function NotAuthentication() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Error
      error="Your authentication is wrong"
      title="Authentication Error !!!"
      resolveElement={
        <Button
          onClick={() => {
            navigate('/login', { state });
          }}
          variant="primary"
        >
          Login
        </Button>
      }
    />
  );
}
