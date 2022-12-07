import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import clsx from 'clsx';
import getUserInGroup from '~/api/group/getUserInGroup';
import Loading from '~/components/Loading';
import PeopleGroup from './peopleGroup';
import StreamGroup from './streamGroup';
import './GroupDetail.css';
import getPresentationInGroup from '~/api/group/getPresentationGroup';

function GroupDetail({ groupId }) {
  const [keyTabs, setKeyTabs] = useState('people');
  const [memberList, setMemberList] = useState([]);
  const [presentationList, setPresentationList] = useState([]);

  const asyncGetMemberGroup = async () => {
    const retGroupList = await getUserInGroup({ id: groupId });
    setMemberList(retGroupList);
    return retGroupList;
  };

  const asyncGetPresentationsGroup = async () => {
    const retPresentationList = await getPresentationInGroup({ id: groupId });
    setPresentationList(retPresentationList);
    return retPresentationList;
  };

  const queryMember = useQuery({
    queryKey: ['GroupDetail'],
    queryFn: asyncGetMemberGroup,
  });

  const queryPresentation = useQuery({
    queryKey: ['PresentationList'],
    queryFn: asyncGetPresentationsGroup,
  });

  return queryMember.isLoading || queryPresentation.isLoading ? (
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
              <StreamGroup
                id={groupId}
                presentations={presentationList}
                query={queryPresentation}
              />
            </Tab>
            <Tab className={clsx('tabsItem')} eventKey="people" title="People">
              <PeopleGroup
                id={groupId}
                members={memberList}
                query={queryMember}
              />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupDetail;
