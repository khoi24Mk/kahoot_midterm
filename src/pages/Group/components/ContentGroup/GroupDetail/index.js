import { useContext, useEffect, useState } from 'react';
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import getPresentationInGroup from '~/api/group/getPresentationGroup';
import getUserInGroup from '~/api/group/getUserInGroup';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';
import './GroupDetail.css';
import PeopleGroup from './peopleGroup';
import PresentationGroup from './presentationGroup';

function GroupDetail() {
  const { id: groupId } = useParams();

  const [memberList, setMemberList] = useState([]);
  const [presentationList, setPresentationList] = useState([]);
  const [myRole, setMyRole] = useState('MEMBER');
  const { profile } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGetData = async () => {
      setLoading(true);
      const retMemberList = await getUserInGroup({ id: groupId });
      const retPresentationList = await getPresentationInGroup({ id: groupId });
      setMemberList(retMemberList);
      setPresentationList(retPresentationList);
      const members = retMemberList.filter((member) => {
        return member.id === profile.id;
      });

      setMyRole(members[0].role);
      setLoading(false);

      return retMemberList;
    };
    asyncGetData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container
      fluid
      className="pt-3"
      style={{
        fontSize: '1rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={12} lg={2}>
            <Card>
              <Card.Body>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Member</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Presentation</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} lg={10}>
            {/* Notification about presenting */}

            <Tab.Content>
              <Tab.Pane eventKey="first">
                <Card>
                  <Card.Body>
                    <PeopleGroup
                      myRole={myRole}
                      id={groupId}
                      members={memberList}
                      setMembers={setMemberList}
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>
              <Tab.Pane eventKey="second">
                <Card>
                  <Card.Body>
                    <PresentationGroup
                      myRole={myRole}
                      id={groupId}
                      presentations={presentationList}
                      setPresentations={setPresentationList}
                    />
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GroupDetail;
