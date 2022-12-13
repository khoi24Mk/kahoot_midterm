import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import getUserInGroup from '~/api/normal/group/getUserInGroup';
import getPresentedPresentationInGroup from '~/api/normal/presentation/getPresentingPresentationGroup';
import Loading from '~/components/Loading';
import { AuthContext } from '~/Context';
import PeopleGroup from './PeopleGroup';
import PresentationGroup from './PresentationGroup';

function GroupDetail() {
  const { id: groupId } = useParams();

  const [memberList, setMemberList] = useState([]);
  const [presentationList, setPresentationList] = useState([]);
  const [myRole, setMyRole] = useState('MEMBER');
  const { profile } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncGetData = async () => {
      try {
        setLoading(true);
        const resMemberList = await getUserInGroup({ id: groupId });
        const resPresentationList = await getPresentedPresentationInGroup({
          id: groupId,
        });
        setMemberList(resMemberList?.data?.object);
        setPresentationList(resPresentationList?.data?.object);
        const members = resMemberList?.data?.object.filter((member) => {
          return member.id === profile.id;
        });

        setMyRole(members[0].role);
        setLoading(false);
      } catch (err) {
        toast.err(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    asyncGetData();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container
      fluid
      className="py-3 h-100"
      style={{
        fontSize: '1rem',
        backgroundColor: '#FFFFFF',
      }}
    >
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row className="h-100">
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
          <Col sm={12} lg={10} className="d-flex flex-column h-100">
            {/* Notification about presenting */}

            <Card className="mb-3 shadow">
              <Card.Body className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <FcInfo className="me-2" size={30} />
                  <div className="fw-bold">
                    There is an presentation in this group. Click to button to
                    join or support
                  </div>
                </div>

                <div className="d-flex">
                  <Button className="me-2">Join</Button>
                  {myRole !== 'MEMBER' && (
                    <Button variant="secondary">Support</Button>
                  )}
                </div>
              </Card.Body>
            </Card>

            <Card className="flex-grow-1 h-100" style={{ overflowY: 'scroll' }}>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <PeopleGroup
                      myRole={myRole}
                      id={groupId}
                      members={memberList}
                      setMembers={setMemberList}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <PresentationGroup
                      myRole={myRole}
                      id={groupId}
                      presentations={presentationList}
                      setPresentations={setPresentationList}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default GroupDetail;
