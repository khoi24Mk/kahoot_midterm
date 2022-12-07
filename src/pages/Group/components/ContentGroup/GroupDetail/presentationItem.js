/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function PresentationItem({ item, deleteOption, deleteCheck, deleteAll }) {
  const [checkedBox, setCheckedBox] = useState(false);
  const handleOnChange = (ev) => {
    const value = ev.target.checked;
    setCheckedBox(value);
    deleteOption(item, value);
  };

  useEffect(() => {
    if (deleteAll) {
      setCheckedBox(true);
    } else {
      setCheckedBox(false);
    }
  }, [deleteAll]);
  return (
    <Container>
      <Row>
        <Col>
          <Form.Check
            inline
            type="checkbox"
            defaultChecked={deleteCheck}
            onChange={handleOnChange}
            checked={checkedBox}
          />
          <Button>play</Button>
        </Col>
        <Col>{item.presentationName ? item.presentationName : 'null'}</Col>
        <Col>
          <span>2 days ago</span>
        </Col>
        <Col>
          <Button href="#" variant="outline-warning">
            Edit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PresentationItem;
