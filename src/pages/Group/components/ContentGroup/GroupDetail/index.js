import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import clsx from 'clsx';
import getUserInGroup from '~/api/group/getUserInGroup';
import Loading from '~/components/Loading';
import PeopleGroup from './peopleGroup';
import StreamGroup from './streamGroup';
import './GroupDetail.css';

function GroupDetail({ groupId }) {
  const [keyTabs, setKeyTabs] = useState('people');
  const [memberList, setMemberList] = useState([]);
  const asyncGetMemberGroup = async () => {
    const retGroupList = await getUserInGroup({ id: groupId });
    setMemberList(retGroupList);
    return retGroupList;
  };

  const query = useQuery({
    queryKey: ['GroupDetail'],
    queryFn: asyncGetMemberGroup,
  });

  return query.isLoading ? (
    <Loading />
  ) : (
    <Container>
      <Row className="justify-content-center">
        <Col xs={4} md={8}>
          <Tabs
            className={clsx('Tabs', 'mb-3')}
            defaultActiveKey="profile"
            activeKey={keyTabs}
            onSelect={(k) => setKeyTabs(k)}
            id="justify-tab-example"
            // className="mb-3"
            justify
          >
            <Tab eventKey="stream" title="Stream">
              <span>{groupId}</span>
              <StreamGroup />
            </Tab>
            <Tab className={clsx('tabsItem')} eventKey="people" title="People">
              <PeopleGroup id={groupId} members={memberList} query={query} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupDetail;
