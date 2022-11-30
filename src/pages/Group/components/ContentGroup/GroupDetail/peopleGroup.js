/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
  Dropdown,
  Modal,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-multi-email/dist/style.css';
import { forwardRef, useContext, useState } from 'react';
import { BsClipboard } from 'react-icons/bs';
import { ReactMultiEmail } from 'react-multi-email';

import { AuthContext } from '~/Context';
import getGroupInvitationLink from '~/api/group/getGroupInvitationLink';
import sendInviteEmails from '~/api/group/sendInviteEmails';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    type="button"
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ color: '#000', textDecoration: 'none' }}
  >
    {children}
    <span className="threedots" />
  </button>
));

function PeopleGroup({ members, id }) {
  const context = useContext(AuthContext);
  const [showCreate, setShowCreate] = useState(false);
  const [emails, setEmails] = useState([]);
  const [inviteLink, setInvilink] = useState('');
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = async () => {
    const link = await getGroupInvitationLink({ id });
    setInvilink(link?.invitationLink);
    setShowCreate(true);
  };

  const handleSendInviteByEmail = async () => {
    const res = await sendInviteEmails({ id, emails });
    console.log(res);
  };

  const { profile } = context;
  const owner = members.filter((member) => member.role === 'OWNER');
  const coOwner = members.filter((mem) => mem.role === 'CO_OWNER');
  const member = members.filter((me) => me.role === 'MEMBER');
  console.log('member', member);
  // const kickOut = members.map((m) => m.role === 'KICK_OUT');

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Card variant="flush" className="mb-5">
                    <Card.Header className="d-flex justify-content-between">
                      <span>Owner</span>
                    </Card.Header>
                    <Table>
                      <tbody>
                        {owner.map((mem) => (
                          <tr
                            key={mem.id}
                            className="d-flex justify-content-between"
                          >
                            <span>{mem.displayName}</span>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>

                  {coOwner.length > 0 ? (
                    <Card variant="flush" className="mb-5">
                      <Card.Header className="d-flex justify-content-between">
                        <span>Co-Owner</span>
                        <Button>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path
                              fillRule="evenodd"
                              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </Button>
                      </Card.Header>
                      <Table>
                        <tbody>
                          {coOwner.map((mem) => (
                            <tr
                              key={mem.id}
                              className="d-flex justify-content-between"
                            >
                              <span>{mem.displayName}</span>
                              {profile.id === owner[0].id ? (
                                <Dropdown>
                                  <Dropdown.Toggle as={CustomToggle} />
                                  <Dropdown.Menu>
                                    <Dropdown.Item>Delete</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item>Unenroll</Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              ) : (
                                ''
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card>
                  ) : undefined}

                  <Card variant="flush" className="mb-5">
                    <Card.Header className="d-flex justify-content-between">
                      <span>Member</span>
                      {profile.id === owner[0]?.id ? (
                        <Button onClick={handleShowCreate}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-person-plus"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                            <path
                              fillRule="evenodd"
                              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                            />
                          </svg>
                        </Button>
                      ) : (
                        ''
                      )}
                    </Card.Header>
                    <Table>
                      <tbody>
                        {member.map((mem) => (
                          <tr
                            key={mem.id}
                            className="d-flex justify-content-between"
                          >
                            <span>{mem.displayName}</span>
                            {profile.id === owner[0].id ? (
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} />
                                <Dropdown.Menu>
                                  <Dropdown.Item>Permission</Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            ) : (
                              ''
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReactMultiEmail
            placeholder="Input your Email Address"
            emails={emails}
            onChange={(_emails) => {
              setEmails(_emails);
            }}
            getLabel={(email, index, removeEmail) => {
              return (
                <div data-tag key={index}>
                  {email}
                  <span data-tag-handle onClick={() => removeEmail(index)}>
                    ×
                  </span>
                </div>
              );
            }}
          />
          <br />
          <hr />

          <OverlayTrigger
            placement="right"
            trigger="click"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip id="button-tooltip">Copy to clipboard</Tooltip>}
          >
            <Button
              variant="light"
              className="d-inline-flex align-items-center"
              onClick={() => {
                navigator.clipboard.writeText(inviteLink);
              }}
            >
              <span className="ms-1">
                Invitation Link <BsClipboard />{' '}
              </span>
            </Button>
          </OverlayTrigger>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreate}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleCloseCreate();
              handleSendInviteByEmail();
            }}
            form="createGroupForm"
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PeopleGroup;
