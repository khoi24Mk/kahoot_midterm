/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable react/style-prop-object */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import clsx from 'clsx';
import GroupInCard from './GroupInCard';
import styles from './groupList.module.css';

function GroupList({ groupList }) {
  const ownerGroups = groupList?.filter((item) => item.role === 'OWNER');
  const coOwnerGroups = groupList?.filter((item) => item.role === 'CO-OWNER');
  const memberGroups = groupList?.filter((item) => item.role === 'MEMBER');

  return (
    <Container>
      {/* g-4 align-items-center */}
      <Row xs={1} md={4} className={clsx(styles.groupList)}>
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
