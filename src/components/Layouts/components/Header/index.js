/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import clsx from 'clsx';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaBeer, FaRegBell } from 'react-icons/fa';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { avt, menu } from '~/img';
import styles from './Header.module.css';

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);
  const hindeA = () => setShowA(false);

  return (
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
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
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
                <img className={clsx(styles.avt)} src={avt} alt="" />
              </Dropdown.Toggle>
              <Dropdown.Menu className={clsx(styles.dropInfo)}>
                <Dropdown.Item href="/profile">My profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">sth</Dropdown.Item>
                <Dropdown.Item href="/login">Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
