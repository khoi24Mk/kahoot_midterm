/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/order */
/* eslint-disable react/button-has-type */
/* eslint-disable react/self-closing-comp */
import { motion } from 'framer-motion';
import clsx from 'clsx';
import styles from './profile.module.css';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.css';

import { avt } from '~/img';

function Profile() {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.header)}>
        <motion.div
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          initial={{ x: -100 }}
          className={clsx(styles.avt_frame)}
        >
          <img src={avt} className={clsx(styles.avt)} />
        </motion.div>
      </div>
      <div className={clsx(styles.body)}>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          initial={{ y: -100, opacity: 0 }}
          className={clsx(styles.overview)}
        >
          {/* <button className={clsx(styles.edit_btn)}>Edit profile</button> */}
          <Button className={clsx(styles.edit_btn)} variant="outline-primary">
            Edit profile
          </Button>{' '}
          <div className={clsx(styles.overview_info)}>
            <div className={clsx(styles.info_detail)}>
              <p>10</p>
              <p>group</p>
            </div>

            <div className={clsx(styles.info_detail)}>
              <p>10</p>
              <p>group</p>
            </div>
            <div className={clsx(styles.info_detail)}>
              <p>10</p>
              <p>group</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          initial={{ y: -100, opacity: 0 }}
          className={clsx(styles.info)}
        >
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>Name</Form.Label>
                <Form.Control />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Username</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
          </Form>
        </motion.div>
        <div className={clsx(styles.group)}>
          <div className={clsx(styles.group_filter)}>
            <p>Recent group</p>
            <a href="/home">Show all </a>
          </div>
          <Carousel className={styles.gallery}>
            <Carousel.Item>
              <img className={styles.img_gr} src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className={styles.img_gr} src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className={styles.img_gr} src={avt} alt="Second slide" />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Profile;
