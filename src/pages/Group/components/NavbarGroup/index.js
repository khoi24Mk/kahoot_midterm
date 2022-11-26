/* eslint-disable react/prop-types */
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavbarGroup({ id }) {
  return (
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
        <Dropdown as={ButtonGroup} id="basic-nav-dropdown" className="ml-1">
          <Button variant="info">Username</Button>
          <Dropdown.Toggle split variant="info" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="/profile">My profile</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Navbar>
  );
}

export default NavbarGroup;
