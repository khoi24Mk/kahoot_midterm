import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import clsx from 'clsx';
import getUserInGroup from '~/api/group/getUserInGroup';
import Loading from '~/components/Loading';
import PeopleGroup from './peopleGroup';
import PresentationGroup from './presentationGroup';
import './GroupDetail.css';
import getPresentationInGroup from '~/api/group/getPresentationGroup';
import { AuthContext } from '~/Context';

function GroupDetail({ groupId }) {
  const [keyTabs, setKeyTabs] = useState('people');
  const [memberList, setMemberList] = useState([]);
  const [presentationList, setPresentationList] = useState([]);
  const [myRole, setMyRole] = useState('MEMBER');
  const { profile } = useContext(AuthContext);

  const asyncGetMemberGroup = async () => {
    const retGroupList = await getUserInGroup({ id: groupId });
    setMemberList(retGroupList);

    const members = retGroupList.filter((member) => {
      return member.id === profile.id;
    });

    setMyRole(members[0].role);

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

  return queryMember.isFetching || queryPresentation.isFetching ? (
    <Loading />
  ) : (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={4} md={8}>
          <Tabs
            className={clsx('Tabs', 'mb-3')}
            defaultActiveKey="profile"
            activeKey={keyTabs}
            onSelect={(k) => setKeyTabs(k)}
            id="justify-tab-example"
            justify
          >
            <Tab eventKey="stream" title="Presentation">
              <PresentationGroup
                myRole={myRole}
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
