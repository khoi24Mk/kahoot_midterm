/* eslint-disable no-unused-vars */
import { Accordion } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import GroupsByRole from './GroupsByRole';
import AddingGroup from '~/components/AddingGroup';

function GroupList({ groupList }) {
  const ownerGroups = groupList?.filter((item) => item.role === 'OWNER');
  const coOwnerGroups = groupList?.filter((item) => item.role === 'CO_OWNER');
  const memberGroups = groupList?.filter((item) => item.role === 'MEMBER');

  return (
    <Container fluid>
      <AddingGroup />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <h3 className="fw-light text-uppercase text-center">Owner</h3>
          </Accordion.Header>
          <Accordion.Body>
            <GroupsByRole groupList={ownerGroups} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div>
              <h3 className="fw-light text-uppercase text-center">Co-Owner</h3>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <GroupsByRole groupList={coOwnerGroups} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div>
              <h3 className="fw-light text-uppercase text-center">Memer</h3>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <GroupsByRole groupList={memberGroups} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}

export default GroupList;
