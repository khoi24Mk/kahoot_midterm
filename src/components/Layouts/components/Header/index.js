/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { FaRegBell } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import logout from '~/api/auth/logout';
import { AuthContext } from '~/Context';
import { avt, menu } from '~/img';
import styles from './Header.module.css';
import getGroupList from '~/api/normal/getGroupList';
import Loading from '~/components/Loading';

function Header() {
  const { id } = useParams();
  const [groupList, setGroupList] = useState([]);
  const asyncGetGroup = async () => {
    const retGroupList = await getGroupList();
    setGroupList(retGroupList);
    return retGroupList;
  };
  const query = useQuery({
    queryKey: ['Header'],
    queryFn: asyncGetGroup,
  });

  const context = useContext(AuthContext);
  const { profile, setProfile } = context;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  const hindeA = () => setShowA(false);

  const handleLogout = async () => {
    await logout();
    setProfile(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  return query.isLoading ? (
    <Loading />
  ) : (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <>
          <Button className={clsx(styles.menu)} onClick={handleShow}>
            <img src={menu} alt="menu" />
          </Button>

          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
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
          </Offcanvas>
        </>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />

            <Button className={styles.search_btn} variant="outline-success">
              Search
            </Button>
          </Form>
          <Row className={clsx(styles.grNoty)}>
            <Col md={6} className="">
              <Button
                onClick={toggleShowA}
                className={clsx(styles.bell, 'mb-s')}
              >
                <FaRegBell />
              </Button>
              <Toast
                className={clsx(styles.notification)}
                show={showA}
                onClose={toggleShowA}
              >
                {[1, 2, 3].map(() => {
                  return (
                    <Toast>
                      <Toast.Header closeButton={false}>
                        <img
                          src="holder.js/20x20?text=%20"
                          className="rounded me-2"
                          alt=""
                        />
                        <strong className="me-auto">Bootstrap</strong>
                        <small>11 mins ago</small>
                      </Toast.Header>
                      <Toast.Body>
                        Woohoo, you're reading this text in a Toast!
                      </Toast.Body>
                    </Toast>
                  );
                })}
              </Toast>
            </Col>
          </Row>
          <div
            onClick={() => {
              hindeA();
            }}
            className={clsx(styles.user)}
          >
            <Dropdown className={clsx(styles.avtDropDown)}>
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
                <Dropdown.Item as={Link} to="/profile">
                  My profile
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">sth</Dropdown.Item>
                <Dropdown.Item as={Link} to="/login" onClick={handleLogout}>
                  Log out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
