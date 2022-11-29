/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import GroupInCard from './GroupInCard';

function GroupList({ groupList }) {
  return (
    <Container>
      <Row xs={1} md={4} className="g-4 align-items-center">
        {groupList.map((data) => {
          return (
            <Col key={data.dateCreated} className="justify-items-center">
              <GroupInCard
                groupId={data.id}
                groupName={data.groupName ? data.groupName : 'Missing'}
                owner={data.ownerName ? data.ownerName : 'Missing'}
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

export default GroupList;
