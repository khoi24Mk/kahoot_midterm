/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { ButtonGroup, Dropdown, Row, Col, Modal } from 'react-bootstrap';
import { ErrorMessage } from '@hookform/error-message';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { forwardRef, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import createGroup from '~/api/group/createGroup';

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
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
      </svg>
    </span>
  </a>
));

const schema = yup
  .object()
  .shape({
    groupName: yup.string().required('Please enter your class name'),
  })
  .required();

function NavbarGroup({ id }) {
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      const response = await createGroup({
        groupName: data.username,
      });
      console.log(response);
      handleCloseCreate();
    } catch (error) {
      // setLoginErr(error?.response?.data?.message);
      console.log(error);
    }
  };

  return (
    <>
      <Navbar bg="light" expand={false} className="mb-3">
        <Container fluid>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${false}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                Kahoot - Class - Clone
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link href="/group">Home</Nav.Link>
                <NavDropdown
                  title="My classes"
                  id={`offcanvasNavbarDropdown-expand-${false}`}
                >
                  <NavDropdown.Item href="/group/1">Class 1</NavDropdown.Item>
                  <NavDropdown.Item href="/group/2">Class 2</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex mt-3">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          {id ? <span>Class {id} </span> : undefined}
          <Row>
            <Col>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} drop="start" />
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleShowCreate}>
                    Create Class
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item>Join Class</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown
                as={ButtonGroup}
                id="basic-nav-dropdown"
                className="ml-1"
              >
                <Button variant="info">Username</Button>
                <Dropdown.Toggle
                  split
                  variant="info"
                  id="dropdown-split-basic"
                />
                <Dropdown.Menu>
                  <Dropdown.Item href="/profile">My profile</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="/">Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </Navbar>

      <Modal show={showCreate} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Create classroom</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} id="createGroupForm">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Class Name</Form.Label>
              <Form.Control
                {...register('groupName')}
                type="text"
                aria-label="Class name"
                aria-describedby="basic-addon1"
                autoFocus
              />
              <Form.Text className="text-muted">
                <ErrorMessage
                  errors={errors}
                  name="groupName"
                  render={({ message }) => (
                    <p style={{ color: 'red', fontSize: '1rem' }}>{message}</p>
                  )}
                />
              </Form.Text>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control name="groupDescription" as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShowCreate}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={() => {
              if (!errors) handleCloseCreate();
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

export default NavbarGroup;
