/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
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

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { AuthContext } from '~/Context';
import getGroupInvitationLink from '~/api/group/getGroupInvitationLink';
import sendInviteEmails from '~/api/group/sendInviteEmails';
import changeRole from '~/api/group/changeRole';
import './GroupDetail.css';

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

function PeopleGroup({ members, id, query }) {
  const context = useContext(AuthContext);
  const [showCreate, setShowCreate] = useState(false);

  const [showAssignRole, setShowAssignRole] = useState(false);
  const [memToAssign, setMemToAssign] = useState({});
  const [roleToAssign, setRoleToAssign] = useState('');
  const [emails, setEmails] = useState([]);
  const [inviteLink, setInvilink] = useState('');
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = async () => {
    const link = await getGroupInvitationLink({ id });
    setInvilink(link?.invitationLink);
    setShowCreate(true);
  };

  const handleSendInviteByEmail = async () => {
    await sendInviteEmails({ id, emails });
  };

  const handleAssignRole = (member, role) => {
    setRoleToAssign(role);
    setMemToAssign(member);
    setShowAssignRole(true);
  };

  const handleSubmitAssignRole = async () => {
    try {
      const response = await changeRole({
        groupId: id,
        userId: parseInt(memToAssign.id, 10),
        role: roleToAssign,
      });
      setShowAssignRole(false);
      setRoleToAssign('');
      setMemToAssign({});
      setShowAssignRole(false);
      query.refetch();
      return response;
    } catch (err) {
      return null;
    }
  };

  const { profile } = context;
  const owner = members.filter((member) => member.role === 'OWNER');
  const coOwner = members.filter((mem) => mem.role === 'CO_OWNER');
  const member = members.filter((me) => me.role === 'MEMBER');
  // const kickOut = members.map((m) => m.role === 'KICK_OUT');

  return (
    <>
      <Container className={clsx('people_frame')}>
        <Row className="justify-content-center">
          <Col>
            <motion.div
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              initial={{ x: -100 }}
            >
              <Card className={clsx('people_card', 'mb-5')}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Card
                      variant="flush"
                      className={clsx('people_cardItem', 'mb-5')}
                    >
                      <Card.Header
                        className={clsx(
                          'people_cardHeader',
                          'd-flex justify-content-between'
                        )}
                      >
                        <span>Owner</span>
                      </Card.Header>
                      <Table>
                        <tbody>
                          {owner.map((mem) => (
                            <tr
                              key={mem.id}
                              className="d-flex justify-content-flex-start"
                            >
                              <span
                                className={clsx('people_userInfo', {
                                  people_myGroup: profile.id === mem.id,
                                })}
                              >
                                <img
                                  className="people_img"
                                  src={mem.avatar}
                                  alt=""
                                />
                                <span>{mem.displayName}</span>
                              </span>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card>

                    {coOwner.length > 0 ? (
                      <Card
                        variant="flush"
                        className={clsx('people_cardItem', 'mb-5')}
                      >
                        <Card.Header
                          className={clsx(
                            'people_cardHeader',
                            'd-flex justify-content-between'
                          )}
                        >
                          <span>Co-Owner</span>
                        </Card.Header>
                        <Table>
                          <tbody>
                            {coOwner.map((mem) => (
                              <tr
                                key={mem.id}
                                className="d-flex justify-content-between"
                              >
                                <span className={clsx('people_userInfo')}>
                                  <img
                                    className="people_img"
                                    src={mem.avatar}
                                    alt=""
                                  />
                                  <span>{mem.displayName}</span>
                                </span>
                                {profile.id === owner[0].id ? (
                                  <Dropdown className={clsx('people_dropdown')}>
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleAssignRole(mem, 'MEMBER')
                                        }
                                      >
                                        Remove Co-owner
                                      </Dropdown.Item>
                                      <Dropdown.Divider />
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleAssignRole(mem, 'KICK_OUT')
                                        }
                                      >
                                        Kickout
                                      </Dropdown.Item>
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

                    <Card
                      variant="flush"
                      className={clsx('people_cardItem', 'mb-5')}
                    >
                      <Card.Header
                        className={clsx(
                          'people_cardHeader',
                          'd-flex justify-content-between'
                        )}
                      >
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
                          {member.map((mem) => {
                            return (
                              <tr
                                key={mem.id}
                                className="d-flex justify-content-between"
                              >
                                <span
                                  className={clsx('people_userInfo', {
                                    people_myGroup: profile.id === mem.id,
                                  })}
                                >
                                  <img
                                    className="people_img"
                                    src={mem.avatar}
                                    alt=""
                                  />
                                  <span>{mem.displayName}</span>
                                </span>
                                {profile.id === owner[0].id ? (
                                  <Dropdown className={clsx('people_dropdown')}>
                                    <Dropdown.Toggle as={CustomToggle} />
                                    <Dropdown.Menu>
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleAssignRole(mem, 'CO_OWNER')
                                        }
                                      >
                                        Add Co-owner
                                      </Dropdown.Item>
                                      <Dropdown.Divider />
                                      <Dropdown.Item
                                        onClick={() =>
                                          handleAssignRole(mem, 'KICK_OUT')
                                        }
                                      >
                                        Kickout
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                ) : (
                                  ''
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create group</Modal.Title>
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

      <Modal show={showAssignRole} onHide={() => setShowAssignRole(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Change role</Modal.Title>
        </Modal.Header>
        {roleToAssign === 'KICK_OUT' ? (
          <Modal.Body>
            Do you want to delete member: {memToAssign.displayName}
          </Modal.Body>
        ) : (
          <Modal.Body>
            Do you want to change this role member: {memToAssign.displayName}
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAssignRole(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitAssignRole()}>
            {roleToAssign === 'KICK_OUT' ? 'Delete' : 'Change'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PeopleGroup;
