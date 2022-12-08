import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';

export default function PresentationGroupToolBar({
  hidden,
  deletable,
  handleAddPresentation,
  handleDeletePresentation,
}) {
  return (
    <Row className={`mb-5 ${hidden ? 'd-none' : ''}`}>
      <Col>
        <Button onClick={handleAddPresentation}>+ New presentation</Button>
        <Button
          variant="danger"
          className="mx-2"
          hidden={deletable}
          onClick={handleDeletePresentation}
        >
          Delete
        </Button>
      </Col>
      <Col>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
      </Col>
    </Row>
  );
}
