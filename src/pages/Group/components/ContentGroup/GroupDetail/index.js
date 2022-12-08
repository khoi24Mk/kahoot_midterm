import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';
import getPresentationInGroup from '~/api/group/getPresentationGroup';
import getUserInGroup from '~/api/group/getUserInGroup';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';
import './GroupDetail.css';
import PeopleGroup from './peopleGroup';
import PresentationGroup from './presentationGroup';

function GroupDetail({ groupId }) {
  const [keyTabs, setKeyTabs] = useState('people');
  const [memberList, setMemberList] = useState([]);
  const [presentationList, setPresentationList] = useState([]);
  const [myRole, setMyRole] = useState('MEMBER');
  const { profile } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGetData = async () => {
      setLoading(true);

      const retGroupList = await getUserInGroup({ id: groupId });
      const retPresentationList = await getPresentationInGroup({ id: groupId });
      setMemberList(retGroupList);
      setPresentationList(retPresentationList);

      const members = retGroupList.filter((member) => {
        return member.id === profile.id;
      });

      setMyRole(members[0].role);
      setLoading(false);

      return retGroupList;
    };
    asyncGetData();
  }, []);

  return loading ? (
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
                setPresentations={setPresentationList}
              />
            </Tab>
            <Tab className={clsx('tabsItem')} eventKey="people" title="People">
              <PeopleGroup id={groupId} members={memberList} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
}

export default GroupDetail;
