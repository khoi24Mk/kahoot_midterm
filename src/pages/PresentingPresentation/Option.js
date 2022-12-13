import React from 'react';
import { Card, Form } from 'react-bootstrap';

export default function Option({ checked, handleCheck, option, id }) {
  return (
    <Card
      className={checked ? 'border-info border-4' : ''}
      style={{ cursor: 'pointer' }}
      onClick={handleCheck}
    >
      <Card.Body>
        <Form.Check
          onChange={(e) => console.log(e.target.value)}
          checked={checked}
          name="answer"
          type="radio"
          id={id}
          label={option}
        />
      </Card.Body>
    </Card>
  );
}
