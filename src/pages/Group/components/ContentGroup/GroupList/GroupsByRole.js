import { Col, Container, Row } from 'react-bootstrap';
import GroupInCard from './GroupInCard';

export default function GroupsByRole({ groupList }) {
  return (
    <Container fluid className="mb-4">
      <Row xs={1} sm={3} lg={5} className="g-4 align-items-center">
        {groupList.map((data) => {
          return (
            <Col key={data.dateCreated} className="justify-items-center">
              <GroupInCard
                groupId={data.id}
                groupName={data.groupName ? data.groupName : 'Missing'}
                owner={data?.owner}
                description={data.description ? data.description : 'Missing'}
                className="mx-auto"
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
