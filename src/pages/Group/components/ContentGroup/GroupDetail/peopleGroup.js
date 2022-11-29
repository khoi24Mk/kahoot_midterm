/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Table,
  Dropdown,
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { forwardRef, useContext } from 'react';
import { AuthContext } from '~/Context';

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
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
  </a>
));

function PeopleGroup({ members }) {
  const context = useContext(AuthContext);
  const { profile } = context;
  const owner = members.filter((member) => member.role === 'OWNER');
  const coOwner = members.filter((mem) => mem.role === 'CO_OWNER');
  const member = members.filter((me) => me.role === 'MEMBER');
  // const kickOut = members.map((m) => m.role === 'KICK_OUT');

  return (
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
                    {profile.id === owner[0].id ? (
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
                    ) : (
                      ''
                    )}
                  </Card.Header>
                  <Table>
                    <tbody>
                      {member.map((name) => (
                        <tr
                          key={name}
                          className="d-flex justify-content-between"
                        >
                          <span>{name}</span>
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
  );
}

export default PeopleGroup;
