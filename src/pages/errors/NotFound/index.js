import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Error from '~/components/Error';

export default function NotFound() {
  return (
    <Error
      error="Page is not found"
      title="Page error !!!"
      resolveElement={
        <Link to="/home">
          <Button variant="primary">Go Home</Button>
        </Link>
      }
    />
  );
}
