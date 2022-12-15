import React from 'react';
import { Card } from 'react-bootstrap';

export default function Paragraph({ slide }) {
  return (
    <Card style={{ minHeight: '500px' }}>
      <Card.Body>
        <div>{slide?.options[0]}</div>
      </Card.Body>
    </Card>
  );
}
