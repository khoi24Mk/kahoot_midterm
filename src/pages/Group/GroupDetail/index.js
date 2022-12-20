import { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { FcInfo } from 'react-icons/fc';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';
import getGroup from '~/api/normal/group/getGroup';
import getUserInGroup from '~/api/normal/group/getUserInGroup';
import getPresentedPresentationInGroup from '~/api/normal/presentation/getPresentedPresentationGroup';
import getPresentingPresentationInGroup from '~/api/normal/presentation/getPresentingPresentationGroup';
import Loading from '~/components/Loading';
import Constant from '~/constants';
import { AuthContext } from '~/Context';
import PeopleGroup from './PeopleGroup';
import PresentationGroup from './PresentationGroup';

function GroupDetail() {
  const { id: groupId } = useParams();

  const [memberList, setMemberList] = useState([]);
  const [presentingPresentation, setPresentingPresentation] = useState();
  const [presentedPresentationList, setPresentedPresentationList] = useState(
    []
  );
  const [myRole, setMyRole] = useState('MEMBER');
  const { profile } = useContext(AuthContext);

  const [group, setGroup] = useState(null);

  const [loading, setLoading] = useState(true);

  const [presentingPresentationId, setPresentingPresentationId] = useState(-1);

  const navigate = useNavigate();
  useEffect(() => {
    const asyncGetData = async () => {
      try {
        setLoading(true);
        // get group

        const groupRes = await getGroup(groupId);
        setGroup(groupRes?.data?.object);
        // get member
        const resMemberList = await getUserInGroup({ id: groupId });
        setMemberList(resMemberList?.data?.object);
        const resPresentedPresentationList =
          await getPresentedPresentationInGroup({
            id: groupId,
          });
        // get presented
        setPresentedPresentationList(
          resPresentedPresentationList?.data?.object
        );
        const resPresentingPresentation =
          await getPresentingPresentationInGroup({
            id: groupId,
          });
        // get presenting
        setPresentingPresentation(resPresentingPresentation?.data?.object);
        setPresentingPresentationId(
          resPresentingPresentation?.data?.object?.id
        );
        const members = resMemberList?.data?.object.filter((member) => {
          return member.id === profile.id;
        });

        setMyRole(members[0].role);
        setLoading(false);
      } catch (err) {
        if (err?.response?.status === 403) {
          navigate({ pathname: '/notPermission' });
        }
        toast.error(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    asyncGetData();
  }, []);

  // handle socket message
  const handleReceivedMessage = (event) => {
    const receivedEvent = JSON.parse(event);
    if (
      receivedEvent.metaData.messageType ===
      Constant.ServerMessageType.presentingPresentationInGroup
    ) {
      setPresentingPresentationId(receivedEvent.message);
    }
  };

  // connect socket
  const { sendMessage } = useWebSocket(Constant.SocketURL, {
    onMessage: (message) => handleReceivedMessage(message?.data),
    share: true,
  });

  // join room with ws
  useEffect(() => {
    if (group == null) return;
    sendMessage(
      JSON.stringify({
        metaData: {
          roomName: group.roomName,
          clientType: Constant.ClientType.host,
          messageType: Constant.ClientMessageType.joinRoom,
        },
        message: null,
      })
    );
    // eslint-disable-next-line consistent-return
    return () =>
      sendMessage(
        JSON.stringify({
          metaData: {
            roomName: group.roomName,
            clientType: Constant.ClientType.host,
            messageType: Constant.ClientMessageType.leaveRoom,
          },
        })
      );
  }, [group]);

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
                    <Nav.Link eventKey="second">
                      Presented Presentations
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">
                      Presenting Presentations
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} lg={10} className="d-flex flex-column h-100">
            {/* Notification about presenting */}

            {presentingPresentationId > 0 && (
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
                    <Button
                      as={Link}
                      to={`/presentation/${presentingPresentationId}/presenting`}
                      className="me-2"
                    >
                      Join
                    </Button>
                    {myRole !== 'MEMBER' && (
                      <Button
                        as={Link}
                        to={`/presentation/${presentingPresentationId}/editing/supporter`}
                        className="me-2"
                        variant="secondary"
                      >
                        Support
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}

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
                      presentations={presentedPresentationList}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <PresentationGroup
                      myRole={myRole}
                      presentations={
                        presentingPresentation == null
                          ? []
                          : [presentingPresentation]
                      }
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
