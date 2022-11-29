/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
  ButtonGroup,
  Dropdown,
  Row,
  Col,
  Modal,
  Image,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import clsx from 'clsx';
import { ErrorMessage } from '@hookform/error-message';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { forwardRef, useState, useContext } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import createGroup from '~/api/group/createGroup';
import styles from './NavbarGroup.module.css';
import { AuthContext } from '~/Context';
import { avt } from '~/img';

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
    description: yup.string(),
  })
  .required();

function NavbarGroup({ id, groupList }) {
  const context = useContext(AuthContext);
  const { profile } = context;

  const [showCreate, setShowCreate] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [createResponse, setCreateResponse] = useState('');
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);
  // console.log(parseInt(id, 10) === parseInt(groupList[14].id, 10));
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
        groupName: data.groupName,
        description: data.description,
      });
      setShowAlert(true);
      setCreateResponse('success');
      handleCloseCreate();
    } catch (error) {
      // setLoginErr(error?.response?.data?.message);
      setCreateResponse('danger');
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
                  {groupList.map((group) => (
                    <NavDropdown.Item
                      style={
                        parseInt(id, 10) === parseInt(group.id, 10)
                          ? { color: 'blue', fontWeight: 'bold' }
                          : {}
                      }
                      key={group.id}
                      href={'/group/'.concat(group.id)}
                    >
                      {group.groupName}
                    </NavDropdown.Item>
                  ))}
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
            {id ? undefined : (
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
            )}
            <Col>
              <Dropdown
                as={ButtonGroup}
                id="basic-nav-dropdown"
                className="ml-1 avtDropDown"
              >
                <Dropdown.Toggle
                  className={clsx(styles.realAvt)}
                  split
                  variant="success"
                  id="dropdown-split-basic"
                >
                  <Image
                    roundedCircle
                    className={clsx(styles.avt)}
                    src={profile?.avatar || avt}
                    alt=""
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className={clsx(styles.dropInfo)}>
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
              <Form.Control
                {...register('description')}
                type="textarea"
                row={3}
              />
              <Form.Text name="desctiption" className="text-muted"></Form.Text>
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
      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showAlert}
          bg={createResponse}
          onClose={() => setShowAlert(false)}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img className="rounded me-2" alt="" />
            <strong className="me-auto">Create Class Notification</strong>
            <small className="text-muted">just now</small>
          </Toast.Header>
          <Toast.Body>
            {createResponse === 'success'
              ? 'Create class successfully!!!'
              : 'Create class failure!!!'}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default NavbarGroup;
