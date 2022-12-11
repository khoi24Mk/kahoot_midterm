/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unstable-nested-components */
import 'bootstrap/dist/css/bootstrap.css';
import { forwardRef, useContext, useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Dropdown,
  Modal,
  OverlayTrigger,
  Row,
  Spinner,
  Tooltip,
} from 'react-bootstrap';
import { BsClipboard } from 'react-icons/bs';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/dist/style.css';

import clsx from 'clsx';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AuthContext } from '~/Context';
import './GroupDetail.css';
import People from './People';
import getGroupInvitationLink from '~/api/normal/group/getGroupInvitationLink';
import sendInviteEmails from '~/api/normal/group/sendInviteEmails';
import changeRole from '~/api/normal/group/changeRole';
import getUserInGroup from '~/api/normal/group/getUserInGroup';

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

function PeopleGroup({ members, setMembers, id: groupId, myRole }) {
  const context = useContext(AuthContext);
  // get link
  const [showInvitationModal, setShowInvitationModal] = useState(false);
  // confirm assign role
  const [showAssignRole, setShowAssignRole] = useState(false);
  // assigned member
  const [memToAssign, setMemToAssign] = useState({});
  // role to assing
  const [roleToAssign, setRoleToAssign] = useState('');
  // email to invite
  const [emails, setEmails] = useState([]);
  // link invitation
  const [inviteLink, setInvilink] = useState('');

  // submitting role/email
  const [submitting, setSubmitting] = useState(false);

  // owners, co-owners, members
  const [peoples, setPeoples] = useState({
    pOwners: [],
    pCoOwners: [],
    pMembers: [],
  });

  // profile contex
  const { profile } = context;

  // handle invitation modal
  const handleHideInvitationModal = () => setShowInvitationModal(false);
  const handleShowInvitationModal = async () => {
    try {
      setShowInvitationModal(true);
      const resLink = await getGroupInvitationLink({ groupId });
      setInvilink(resLink?.data?.object?.invitationLink);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  // handle send invitation
  const handleSendInviteByEmail = async () => {
    try {
      setSubmitting(true);
      await sendInviteEmails({ groupId, emails });
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setSubmitting(false);
      setShowInvitationModal(false);
    }
  };

  // handle assign role
  const handleAssignRole = (member, role) => {
    setRoleToAssign(role);
    setMemToAssign(member);
    setShowAssignRole(true);
  };

  // handle submit assign role
  const handleSubmitAssignRole = async () => {
    setSubmitting(true);
    try {
      await changeRole({
        groupId,
        userId: memToAssign.id,
        role: roleToAssign,
      });

      // refetching member
      const resMemberList = await getUserInGroup({ id: groupId });
      setMembers(resMemberList?.data?.object);
      setShowAssignRole(false);
      setRoleToAssign('');
      setMemToAssign({});
      setShowAssignRole(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fOwner = members.filter((oMem) => oMem?.role === 'OWNER');
    const fCoOwner = members.filter((cMem) => cMem?.role === 'CO_OWNER');
    const fMember = members.filter((mem) => mem?.role === 'MEMBER');

    setPeoples({
      pCoOwners: [...fCoOwner],
      pMembers: [...fMember],
      pOwners: [...fOwner],
    });
  }, [members]);

  return (
    <>
      <Container fluid className={clsx('people_frame')}>
        <Row className="justify-content-center">
          <Col>
            <motion.div
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
              initial={{ x: -100 }}
            >
              <div className="mb-5">
                <h3 style={{ color: '#C26407' }}>OWNER</h3>
                <hr style={{ color: '#C26407' }} />
                {peoples?.pOwners?.map((mem) => (
                  <People
                    key={mem.id}
                    me={mem.id === profile.id}
                    img={mem.avatar}
                    name={mem.displayName}
                  />
                ))}
              </div>
              <div className="mb-5">
                <h3 style={{ color: '#C26407' }}>CO-OWNER</h3>
                <hr style={{ color: '#C26407' }} />

                {peoples?.pCoOwners?.map((mem) => (
                  <People
                    key={mem.id}
                    me={mem.id === profile.id}
                    img={mem.avatar}
                    name={mem.displayName}
                    endElement={
                      myRole === 'OWNER' && (
                        <Dropdown className={clsx('people_dropdown')}>
                          <Dropdown.Toggle as={CustomToggle} />
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => handleAssignRole(mem, 'MEMBER')}
                            >
                              Remove Co-owner
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item
                              onClick={() => handleAssignRole(mem, 'KICK_OUT')}
                            >
                              Kickout
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      )
                    }
                  />
                ))}
              </div>
              <div className="mb-5">
                <div className="d-flex justify-content-between">
                  <h3 style={{ color: '#C26407' }}>MEMBER</h3>
                  <Button
                    style={{ backgroundColor: '#C26407' }}
                    onClick={handleShowInvitationModal}
                  >
                    <b>Invite</b>
                  </Button>
                </div>
                <hr style={{ color: '#C26407' }} />

                {peoples?.pMembers.map((mem) => {
                  return (
                    <People
                      key={mem.id}
                      me={mem.id === profile.id}
                      img={mem.avatar}
                      name={mem.displayName}
                      endElement={
                        myRole === 'OWNER' && (
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
                        )
                      }
                    />
                  );
                })}
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <Modal show={showInvitationModal} onHide={handleHideInvitationModal}>
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
          <Button variant="secondary" onClick={handleHideInvitationModal}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              handleHideInvitationModal();
              handleSendInviteByEmail();
            }}
            form="createGroupForm"
            disabled={submitting}
          >
            {submitting && <Spinner size="sm" />}
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
          <Button
            variant="primary"
            onClick={() => handleSubmitAssignRole()}
            disabled={submitting}
          >
            {submitting && <Spinner size="sm" />}
            {roleToAssign === 'KICK_OUT' ? 'Delete' : 'Change'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PeopleGroup;
