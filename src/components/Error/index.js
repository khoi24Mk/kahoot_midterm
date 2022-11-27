import { Card, Container } from 'react-bootstrap';

export default function Error({ error, title, resolveElement }) {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="w-75">
        <Card.Body>
          <Card.Title>
            <h3 className="fw-bold text-uppercase">{title}</h3>
          </Card.Title>
          <Card.Text className="text-secondary">{error}</Card.Text>
          {resolveElement}
        </Card.Body>
      </Card>
    </Container>
  );
}
