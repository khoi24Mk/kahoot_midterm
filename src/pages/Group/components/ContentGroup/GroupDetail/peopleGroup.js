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
import { forwardRef } from 'react';

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

function PeopleGroup() {
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
                    <Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </Button>
                  </Card.Header>
                  <Table>
                    <tbody>
                      <tr className="d-flex justify-content-between">
                        <span>Nguyễn Hữu Thông</span>
                        {true ? (
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu>
                              <Dropdown.Item>Move</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item>Unenroll</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : (
                          ''
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Card>

                <Card variant="flush" className="mb-5">
                  <Card.Header className="d-flex justify-content-between">
                    <span>Co-Owner</span>
                    <Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </Button>
                  </Card.Header>
                  <Table>
                    <tbody>
                      <tr className="d-flex justify-content-between">
                        <span>Nguyễn Hữu Thông</span>
                        {true ? (
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu>
                              <Dropdown.Item>Move</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item>Unenroll</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        ) : (
                          ''
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Card>

                <Card variant="flush" className="mb-5">
                  <Card.Header className="d-flex justify-content-between">
                    <span>Member</span>
                    <Button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-three-dots-vertical"
                        viewBox="0 0 16 16"
                      >
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </Button>
                  </Card.Header>
                  <Table>
                    <tbody>
                      {['a', 'b', 'c', 'd', 'e', 'f'].map((name) => (
                        <tr
                          key={name}
                          className="d-flex justify-content-between"
                        >
                          <span>{name}</span>
                          {true ? (
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
