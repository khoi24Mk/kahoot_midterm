import { Col, Container, Row } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './groupList.module.css';
import GroupInCard from './GroupInCard';

export default function GroupsByRole({ groupList }) {
  return (
    <Container fluid className="mb-4">
      <Row xs={1} md={2} lg={3} xxl={5}>
        {groupList.map((data) => {
          return (
            <Col
              key={data.dateCreated}
              className={clsx(styles.GroupCard, 'justify-items-center')}
            >
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
