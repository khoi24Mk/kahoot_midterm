import { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import PeopleGroup from './peopleGroup';
import StreamGroup from './streamGroup';

/* eslint-disable react/prop-types */
function GroupDetail({ groupId }) {
  const [keyTabs, setKeyTabs] = useState('people');
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={4} md={8}>
          <Tabs
            defaultActiveKey="profile"
            activeKey={keyTabs}
            onSelect={(k) => setKeyTabs(k)}
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="stream" title="Stream">
              <span>{groupId}</span>
              <StreamGroup />
            </Tab>
            <Tab eventKey="people" title="People">
              <PeopleGroup />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupDetail;
