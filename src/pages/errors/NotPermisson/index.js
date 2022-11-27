import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Error from '~/components/Error';

export default function NotPermission() {
  const navigate = useNavigate();
  return (
    <Error
      error="You don't have permission for this action"
      title="Authorization Error !!!"
      resolveElement={
        <Button
          onClick={() => {
            navigate(-1);
          }}
          variant="primary"
        >
          Go back
        </Button>
      }
    />
  );
}
